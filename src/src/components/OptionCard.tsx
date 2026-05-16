import React from 'react';
import { BsCheck } from 'react-icons/bs';

interface RadioProps {
  label: string;
  emoji?: string;
  selected: boolean;
  onSelect: () => void;
}

export const RadioOption: React.FC<RadioProps> = ({ label, emoji, selected, onSelect }) => (
  <div className={`option-card${selected ? ' selected' : ''}`} onClick={onSelect} role="radio" aria-checked={selected} tabIndex={0}
    onKeyDown={e => e.key === 'Enter' && onSelect()}>
    <span className="dot" />
    {emoji && <span>{emoji}</span>}
    <span className="option-label">{label}</span>
  </div>
);

interface CheckProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children?: React.ReactNode;
}

export const CheckOption: React.FC<CheckProps> = ({ label, checked, onChange, children }) => (
  <div className={`option-card${checked ? ' selected' : ''}`} onClick={() => onChange(!checked)} role="checkbox" aria-checked={checked} tabIndex={0}
    onKeyDown={e => e.key === 'Enter' && onChange(!checked)}>
    <span className="square">{checked && <BsCheck size={12} />}</span>
    <span className="option-label">{children || label}</span>
  </div>
);
