import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Product } from '../../types';

export function ProductForm({ product, onComplete }: { product: Product, onComplete: () => void }) {
  const [formData, setFormData] = useState(product);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDoc(doc(db, 'products', product.id), { ...formData });
      onComplete();
    } catch (err) {
      console.error(err);
      alert("Error saving");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Name</label>
        <input type="text" className="w-full border p-2" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Category</label>
          <input type="text" className="w-full border p-2" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Price</label>
          <input type="number" className="w-full border p-2" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Description</label>
        <textarea className="w-full border p-2 h-32" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Main Image URL</label>
        <input type="text" className="w-full border p-2" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Craftsmanship Details (One per line)</label>
        <textarea 
          className="w-full border p-2 h-32" 
          value={formData.details?.join('\n') || ''} 
          onChange={e => setFormData({...formData, details: e.target.value.split('\n').filter(d => d.trim() !== '')})} 
          placeholder="e.g. Hand-beaded Bodice\nFrench Lace"
        />
      </div>
      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={saving} className="bg-[#0C0B09] text-white px-6 py-2 uppercase text-xs tracking-widest">
          {saving ? 'Saving...' : 'Save Product'}
        </button>
        <button type="button" onClick={onComplete} className="border border-[#0C0B09] px-6 py-2 uppercase text-xs tracking-widest">
          Cancel
        </button>
      </div>
    </form>
  );
}
