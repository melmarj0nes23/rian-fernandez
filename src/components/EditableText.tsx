import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Pencil, Check, X } from 'lucide-react';

interface EditableTextProps {
  value: string;
  collection: string;
  documentId: string;
  field: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  style?: React.CSSProperties;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

export function EditableText({
  value,
  collection,
  documentId,
  field,
  as: Component = 'span',
  className = '',
  style = {},
  wrapperClassName = 'relative group w-fit inline-block',
  wrapperStyle = {}
}: EditableTextProps) {
  const { isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  // If not admin, just render the text normally
  if (!isAdmin) {
    return <Component className={className} style={style}>{value}</Component>;
  }

  const handleSave = async () => {
    if (currentValue === value) {
      setIsEditing(false);
      return;
    }
    
    setIsSaving(true);
    try {
      const docRef = doc(db, collection, documentId);
      await setDoc(docRef, { [field]: currentValue }, { merge: true });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Failed to save changes. Make sure you have admin permissions.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`${wrapperClassName} w-full`} style={wrapperStyle}>
        {Component === 'p' ? (
          <textarea
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="w-full bg-white/10 border border-[#B8955A] p-2 outline-none resize-none"
            rows={4}
            style={{ color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit', fontStyle: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit', lineHeight: 'inherit' }}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="w-full bg-white/10 border-b border-[#B8955A] outline-none px-1"
            style={{ color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit', fontStyle: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit' }}
            autoFocus
          />
        )}
        <div className="absolute -top-8 right-0 flex gap-2 bg-[#0C0B09] rounded-md p-1 shadow-lg z-50">
          <button onClick={handleSave} disabled={isSaving} className="text-green-400 hover:bg-white/10 p-1 rounded">
            <Check size={14} />
          </button>
          <button onClick={handleCancel} disabled={isSaving} className="text-red-400 hover:bg-white/10 p-1 rounded">
            <X size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      <Component className={className} style={style}>{value}</Component>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#B8955A] text-white p-1.5 rounded-full shadow-lg z-10 hover:scale-110"
      >
        <Pencil size={12} />
      </button>
    </div>
  );
}
