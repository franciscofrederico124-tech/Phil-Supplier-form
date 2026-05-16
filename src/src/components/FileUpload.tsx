import React, { useRef, useState } from 'react';
import { BsCloudUpload, BsFileEarmarkCheck } from 'react-icons/bs';

interface Props {
  file: File | null;
  onChange: (f: File | null) => void;
  error?: string;
}

export const FileUpload: React.FC<Props> = ({ file, onChange, error }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const cls = `file-drop${drag ? ' drag' : ''}${file ? ' has-file' : ''}${error ? ' has-error' : ''}`;

  return (
    <div>
      <label
        className={cls}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) onChange(f); }}
        onClick={() => ref.current?.click()}
      >
        <div className="file-drop-icon">
          {file ? <BsFileEarmarkCheck /> : <BsCloudUpload />}
        </div>
        <div className="file-drop-text">
          {file ? file.name : 'Clique ou arraste o comprovativo aqui'}
        </div>
        <div className="file-drop-sub">
          {file ? `${(file.size / 1024).toFixed(1)} KB` : 'PDF, JPG ou PNG — máx. 5 MB'}
        </div>
        <input ref={ref} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => onChange(e.target.files?.[0] ?? null)} />
      </label>
      {error && <div className="field-error">⚠ {error}</div>}
    </div>
  );
};
