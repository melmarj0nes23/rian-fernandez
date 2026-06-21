import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { JournalEntry } from '../../types';

export function JournalForm({ entry, onComplete }: { entry: JournalEntry, onComplete: () => void }) {
  const [formData, setFormData] = useState(entry);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDoc(doc(db, 'journalEntries', entry.id), { ...formData });
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
        <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Title</label>
        <input type="text" className="w-full border p-2" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Category</label>
          <input type="text" className="w-full border p-2" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Date</label>
          <input type="date" className="w-full border p-2" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Excerpt</label>
        <textarea className="w-full border p-2 h-20" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Full Content</label>
        <textarea className="w-full border p-2 h-40" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#7A7468] mb-1">Image URL</label>
        <input type="text" className="w-full border p-2" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
      </div>
      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={saving} className="bg-[#0C0B09] text-white px-6 py-2 uppercase text-xs tracking-widest">
          {saving ? 'Saving...' : 'Save Entry'}
        </button>
        <button type="button" onClick={onComplete} className="border border-[#0C0B09] px-6 py-2 uppercase text-xs tracking-widest">
          Cancel
        </button>
      </div>
    </form>
  );
}
