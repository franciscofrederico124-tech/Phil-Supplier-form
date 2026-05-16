import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

interface Props { onClose: () => void; }

export const SuccessModal: React.FC<Props> = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-card">
      <span className="modal-icon"><BsCheckCircleFill /></span>
      <h2 className="modal-title">Inscrição Confirmada!</h2>
      <p className="modal-sub">
        A sua inscrição foi submetida com sucesso.<br />
        Entraremos em contacto em breve através do email fornecido.
      </p>
      <button className="btn btn-primary" style={{ width: '100%' }} onClick={onClose}>
        Fazer nova inscrição
      </button>
    </div>
  </div>
);
