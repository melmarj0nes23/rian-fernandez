import fs from 'fs';

const content = fs.readFileSync('src/app/App.tsx', 'utf8');

const sections = [
  { header: 'Types', filename: 'src/types/index.ts' },
  { header: 'Data', filename: 'src/data/index.ts' },
  { header: 'Scroll Reveal Hook', filename: 'src/hooks/useScrollReveal.ts' },
  { header: 'Navigation', filename: 'src/components/layout/Navigation.tsx' },
  { header: 'Footer', filename: 'src/components/layout/Footer.tsx' },
  { header: 'Home Page', filename: 'src/pages/Home.tsx' },
  { header: 'Collections Page', filename: 'src/pages/Collections.tsx' },
  { header: 'Collection Detail Page', filename: 'src/pages/CollectionDetail.tsx' },
  { header: 'Boutique Page', filename: 'src/pages/Boutique.tsx' },
  { header: 'Product Detail Page', filename: 'src/pages/ProductDetail.tsx' },
  { header: 'Designer Page', filename: 'src/pages/Designer.tsx' },
  { header: 'Atelier Page', filename: 'src/pages/Atelier.tsx' },
  { header: 'Journal Page', filename: 'src/pages/Journal.tsx' },
  { header: 'Appointments Page', filename: 'src/pages/Appointments.tsx' },
  { header: 'Cart Page', filename: 'src/pages/Cart.tsx' },
  { header: 'Checkout Page', filename: 'src/pages/Checkout.tsx' },
  { header: 'Confirmation Page', filename: 'src/pages/Confirmation.tsx' }
];

const lines = content.split('\n');
let currentSection = null;
const fileContents = {};
let topImports = [];
let parsingImports = true;

for (let line of lines) {
  if (parsingImports) {
    if (line.startsWith('// ───')) {
      parsingImports = false;
    } else {
      topImports.push(line);
      continue;
    }
  }
  
  if (line.startsWith('// ───')) {
    const match = sections.find(s => line.includes(s.header));
    if (match) {
      currentSection = match.filename;
      fileContents[currentSection] = [];
    } else if (line.includes('App ───')) {
      currentSection = null; // Stop at App
    }
    continue;
  }
  
  if (currentSection) {
    fileContents[currentSection].push(line);
  }
}

function getRelativeImports(filename) {
  const depth = filename.split('/').length - 2;
  const prefix = depth === 1 ? '../' : '../../';
  let imps = topImports.join('\n') + '\n';
  
  if (filename.includes('.tsx') || filename === 'src/hooks/useScrollReveal.ts') {
    imps += `import { Link, useNavigate, useLocation, useParams } from 'react-router';\n`;
    imps += `import { Page, Collection, Product, CartItem, JournalEntry } from '${prefix}types';\n`;
    imps += `import { COLLECTIONS, PRODUCTS, JOURNAL_ENTRIES } from '${prefix}data';\n`;
    if (!filename.includes('hooks/')) imps += `import { useScrollReveal } from '${prefix}hooks/useScrollReveal';\n`;
  }
  return imps;
}

for (const [filename, lines] of Object.entries(fileContents)) {
  let contentToWrite = lines.join('\n');
  
  if (filename === 'src/types/index.ts') {
      contentToWrite = contentToWrite.replace(/interface /g, 'export interface ').replace(/type /g, 'export type ');
  } else if (filename === 'src/data/index.ts') {
      contentToWrite = `import { Collection, Product, JournalEntry } from '../types';\n` + contentToWrite.replace(/const /g, 'export const ');
  } else if (filename === 'src/hooks/useScrollReveal.ts') {
      contentToWrite = `import { useState, useEffect, useRef } from "react";\n` + contentToWrite.replace(/function /g, 'export function ');
  } else {
      contentToWrite = getRelativeImports(filename) + '\n' + contentToWrite;
      contentToWrite = contentToWrite.replace(/function /g, 'export function ');
  }
  
  fs.writeFileSync(filename, contentToWrite);
}
console.log('Extraction complete!');
