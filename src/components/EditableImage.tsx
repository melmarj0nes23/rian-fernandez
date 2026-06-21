import { useState, useRef } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Image as ImageIcon, Check, X, Upload } from 'lucide-react';

interface EditableImageProps {
  src: string;
  alt: string;
  collection: string;
  documentId: string;
  field: string;
  className?: string;
  style?: React.CSSProperties;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

export function EditableImage({
  src,
  alt,
  collection,
  documentId,
  field,
  className = '',
  style = {},
  wrapperClassName = 'relative inline-block group',
  wrapperStyle = {}
}: EditableImageProps) {
  const { isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(src);
  const [isSaving, setIsSaving] = useState(false);

  if (!isAdmin) {
    return <img src={src} alt={alt} className={className} style={style} />;
  }

  const handleSave = async () => {
    if (currentUrl === src) {
      setIsEditing(false);
      return;
    }
    
    setIsSaving(true);
    try {
      const docRef = doc(db, collection, documentId);
      await setDoc(docRef, { [field]: currentUrl }, { merge: true });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save image url:", err);
      alert("Failed to save image. Make sure you have admin permissions.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      <img src={currentUrl || src} alt={alt} className={className} style={style} />
      
      {isAdmin && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute bottom-4 right-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity bg-[#B8955A] text-white p-2.5 rounded-full shadow-lg z-50 hover:scale-110"
        >
          <ImageIcon size={16} />
        </button>
      )}

      {isAdmin && isEditing && (
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-2xl z-50 flex items-center gap-2 border border-black/5 w-[300px] max-w-[90vw]">
          <input
            type="text"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            className="flex-1 px-3 py-1.5 text-sm bg-black/5 border border-black/10 text-black rounded focus:outline-none focus:border-[#B8955A] transition-colors"
            placeholder="Image URL..."
            autoFocus
          />
          <button
            onClick={() => {
              setIsEditing(false);
              setCurrentUrl(src);
            }}
            className="p-1.5 hover:bg-black/5 text-black/60 hover:text-black rounded-full transition-colors"
          >
            <X size={16} />
          </button>
          <button
            onClick={handleSave}
            className="p-1.5 bg-[#B8955A] hover:bg-[#a0824b] text-white rounded-full transition-colors shadow-sm"
          >
            <Check size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
