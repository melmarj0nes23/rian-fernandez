import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { useNavigate } from 'react-router';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { Trash2, Pencil } from 'lucide-react';
import { CollectionForm } from '../components/admin/CollectionForm';
import { ProductForm } from '../components/admin/ProductForm';
import { JournalForm } from '../components/admin/JournalForm';

export function AdminDashboardPage() {
  const { user, isAdmin, loading: authLoading, logout } = useAuth();
  const { collections, products, journalEntries, loading: contentLoading } = useContent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('collections');
  const [isProcessing, setIsProcessing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  if (authLoading || contentLoading) {
    return <div className="min-h-screen bg-[#F7F4EE]"></div>;
  }

  // If not logged in, or if NOT admin
  if (!user || !isAdmin) {
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleAddNew = async () => {
    setIsProcessing(true);
    try {
      if (activeTab === 'collections') {
        const docRef = await addDoc(collection(db, 'collections'), {
          name: 'New Collection',
          year: new Date().getFullYear().toString(),
          season: 'Season',
          pieces: 0,
          tagline: 'A new masterpiece collection',
          description: 'Description here',
          image: 'https://via.placeholder.com/600x800?text=Collection',
          coverImage: 'https://via.placeholder.com/800x1000?text=Cover',
          order: collections.length
        });
        // You can click edit on it now
      } else if (activeTab === 'products') {
        const docRef = await addDoc(collection(db, 'products'), {
          name: 'New Product',
          collectionId: collections[0]?.id || '',
          price: 1000,
          category: 'Gown',
          description: 'Product description',
          image: 'https://via.placeholder.com/600x800?text=Product',
          images: ['https://via.placeholder.com/600x800?text=Product'],
          materials: ['Silk'],
          details: ['Detail 1'],
          inStock: true
        });
      } else if (activeTab === 'journal') {
        const docRef = await addDoc(collection(db, 'journalEntries'), {
          title: 'New Journal Entry',
          date: new Date().toISOString().split('T')[0],
          category: 'News',
          excerpt: 'A short excerpt...',
          content: 'Full article content here.',
          image: 'https://via.placeholder.com/800x500?text=Journal'
        });
      } else {
        alert("Cannot add new items for this section yet.");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding item");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: string, collectionName: string) => {
    if (!window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) return;
    
    setIsProcessing(true);
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (err) {
      console.error(err);
      alert("Error deleting item");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderTableContent = () => {
    if (activeTab === 'collections') {
      return collections.map(c => (
        <div key={c.id} className="flex justify-between items-center p-4 border border-[#E8E4D9] hover:border-[#B8955A] transition-colors">
          <div>
            <h3 className="font-['Bodoni_Moda'] text-lg">{c.name}</h3>
            <p className="font-['Raleway'] text-xs text-[#7A7468] uppercase tracking-widest mt-1">{c.season} {c.year}</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setEditingItem(c)} className="text-[#B8955A] hover:opacity-70"><Pencil size={18} /></button>
            <button onClick={() => handleDelete(c.id, 'collections')} className="text-red-400 hover:opacity-70"><Trash2 size={18} /></button>
          </div>
        </div>
      ));
    }
    if (activeTab === 'products') {
      return products.map(p => (
        <div key={p.id} className="flex justify-between items-center p-4 border border-[#E8E4D9] hover:border-[#B8955A] transition-colors">
          <div className="flex items-center gap-4">
            <img src={p.image} alt={p.name} className="w-12 h-16 object-cover bg-gray-100" />
            <div>
              <h3 className="font-['Bodoni_Moda'] text-lg">{p.name}</h3>
              <p className="font-['Raleway'] text-xs text-[#7A7468] uppercase tracking-widest mt-1">${p.price} · {p.category}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setEditingItem(p)} className="text-[#B8955A] hover:opacity-70"><Pencil size={18} /></button>
            <button onClick={() => handleDelete(p.id, 'products')} className="text-red-400 hover:opacity-70"><Trash2 size={18} /></button>
          </div>
        </div>
      ));
    }
    if (activeTab === 'journal') {
      return journalEntries.map(j => (
        <div key={j.id} className="flex justify-between items-center p-4 border border-[#E8E4D9] hover:border-[#B8955A] transition-colors">
          <div>
            <h3 className="font-['Bodoni_Moda'] text-lg">{j.title}</h3>
            <p className="font-['Raleway'] text-xs text-[#7A7468] uppercase tracking-widest mt-1">{j.date} · {j.category}</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setEditingItem(j)} className="text-[#B8955A] hover:opacity-70"><Pencil size={18} /></button>
            <button onClick={() => handleDelete(j.id, 'journalEntries')} className="text-red-400 hover:opacity-70"><Trash2 size={18} /></button>
          </div>
        </div>
      ));
    }
    return <p className="font-['Raleway'] text-sm text-[#7A7468]">No data available for this section.</p>;
  };

  return (
    <div className="pt-32 md:pt-40 pb-32 min-h-screen bg-[#F7F4EE]">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 300, color: "#B8955A" }}>
              Control Panel
            </p>
            <h1 style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#0C0B09" }}>
              Administrator
            </h1>
          </div>
          <button 
            onClick={handleLogout}
            className="text-xs tracking-[0.2em] uppercase px-6 py-3 transition-colors duration-300"
            style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, border: "1px solid #0C0B09", color: "#0C0B09", background: "transparent" }}
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {[
              { id: 'collections', label: 'Collections' },
              { id: 'products', label: 'Boutique Products' },
              { id: 'journal', label: 'Journal Entries' },
              { id: 'orders', label: 'Customer Orders' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setEditingItem(null); }}
                className="text-left py-3 px-4 text-xs tracking-[0.15em] uppercase transition-colors"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: activeTab === tab.id ? 400 : 300,
                  backgroundColor: activeTab === tab.id ? "#0C0B09" : "transparent",
                  color: activeTab === tab.id ? "#F7F4EE" : "#7A7468",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="md:col-span-3 bg-white p-8 md:p-12 shadow-sm min-h-[60vh]">
            {editingItem ? (
              <div>
                <h2 className="text-xl mb-6" style={{ fontFamily: "'Bodoni Moda', serif", color: "#0C0B09" }}>
                  Edit {editingItem.name || editingItem.title}
                </h2>
                {activeTab === 'collections' && <CollectionForm collection={editingItem} onComplete={() => setEditingItem(null)} />}
                {activeTab === 'products' && <ProductForm product={editingItem} onComplete={() => setEditingItem(null)} />}
                {activeTab === 'journal' && <JournalForm entry={editingItem} onComplete={() => setEditingItem(null)} />}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                   <h2 className="text-xl" style={{ fontFamily: "'Bodoni Moda', serif", color: "#0C0B09" }}>
                     Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                   </h2>
                   <button 
                     onClick={handleAddNew}
                     disabled={isProcessing}
                     className="text-xs tracking-[0.2em] uppercase px-6 py-3 bg-[#0C0B09] text-[#F7F4EE] hover:opacity-80 transition-opacity disabled:opacity-50" 
                     style={{ fontFamily: "Raleway, sans-serif" }}
                   >
                     {isProcessing ? 'Processing...' : 'Add New'}
                   </button>
                </div>
                
                <div className="space-y-4">
                  {renderTableContent()}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
