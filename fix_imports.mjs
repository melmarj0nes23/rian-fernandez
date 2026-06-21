import fs from 'fs';
import path from 'path';

const dirsToProcess = ['src/pages', 'src/components/layout'];

for (const dir of dirsToProcess) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.endsWith('.tsx')) continue;
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the Reveal import
    content = content.replace(/import \{ useScrollReveal \} from '\.\.\/hooks\/useScrollReveal';/g, "import { Reveal, useReveal } from '../hooks/useScrollReveal';");
    content = content.replace(/import \{ useScrollReveal \} from '\.\.\/\.\.\/hooks\/useScrollReveal';/g, "import { Reveal, useReveal } from '../../hooks/useScrollReveal';");

    fs.writeFileSync(filePath, content);
  }
}

// Fix ReactNode in useScrollReveal.ts
let hookContent = fs.readFileSync('src/hooks/useScrollReveal.ts', 'utf8');
hookContent = hookContent.replace(/import \{ useState, useEffect, useRef \} from "react";/g, 'import { useState, useEffect, useRef, ReactNode } from "react";');
fs.writeFileSync('src/hooks/useScrollReveal.ts', hookContent);

console.log('Fixed imports!');
