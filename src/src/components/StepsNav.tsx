import React from 'react';

interface Props { current: number; total: number; labels: string[]; }

export const StepsNav: React.FC<Props> = ({ current, total, labels }) => (
  <div>
    <div className="steps-nav">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="step-seg">
          <div className="step-seg-fill" style={{ width: i < current ? '100%' : i === current ? '50%' : '0%' }} />
        </div>
      ))}
    </div>
    <div className="step-label">
      <span><strong>{labels[current]}</strong></span>
      <span>Passo {current + 1} de {total}</span>
    </div>
  </div>
);
