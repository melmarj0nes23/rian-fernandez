import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Collection } from '../../types';

export function CollectionForm({ collection, onComplete }: { collection: Collection, onComplete: () => void }) {
  const [formData, setFormData] = useState(collection);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDoc(doc(db, 'collections', collection.id), { ...formData });
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
          <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Season</label>
          <input type="text" className="w-full border p-2" value={formData.season} onChange={e => setFormData({...formData, season: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Year</label>
          <input type="text" className="w-full border p-2" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Tagline</label>
        <input type="text" className="w-full border p-2" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Description</label>
        <textarea className="w-full border p-2 h-32" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Cover Image URL</label>
        <input type="text" className="w-full border p-2" value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})} />
      </div>
      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={saving} className="bg-[#0C0B09] text-white px-6 py-2 uppercase text-xs tracking-widest">
          {saving ? 'Saving...' : 'Save Collection'}
        </button>
        <button type="button" onClick={onComplete} className="border border-[#0C0B09] px-6 py-2 uppercase text-xs tracking-widest">
          Cancel
        </button>
      </div>
    </form>
  );
}
