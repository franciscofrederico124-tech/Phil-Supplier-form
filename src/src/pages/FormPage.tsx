import React, { useState } from 'react';
import {
  BsPerson, BsBook, BsLaptop, BsMegaphone,
  BsClock, BsShieldCheck, BsArrowLeft, BsArrowRight,
  BsWhatsapp, BsTelephone,
} from 'react-icons/bs';

import { StepsNav }                    from '../components/StepsNav';
import { RadioOption, CheckOption }    from '../components/OptionCard';
import { FileUpload }                  from '../components/FileUpload';
import { SuccessModal }                from '../components/SuccessModal';
import { useFormState }                from '../hooks/useFormState';
import { submitInscricao }             from '../services/formService';
import logo                            from '../assets/logo.jpg';
import '../styles/global.css';
import '../styles/form.css';

const STEPS = ['Dados Pessoais', 'Curso', 'Infraestrutura', 'Divulgação', 'Pagamento', 'Confirmação'];
const TOTAL  = STEPS.length;

const STEP_ICONS = [BsPerson, BsBook, BsLaptop, BsMegaphone, BsClock, BsShieldCheck];

const CURSOS  = ['Python', 'C++', 'JavaScript', 'Java', 'C#', 'Outro'];
const NIVEIS  = [
  { v: 'iniciante',     l: 'Iniciante',     e: '🌱' },
  { v: 'intermediario', l: 'Intermediário',  e: '🚀' },
  { v: 'avancado',      l: 'Avançado',       e: '🔥' },
];
const REDES   = [
  { v: 'facebook',      l: 'Facebook',       e: '📘' },
  { v: 'whatsapp',      l: 'WhatsApp',        e: '💬' },
  { v: 'instagram',     l: 'Instagram',       e: '📸' },
  { v: 'amigofamiliar', l: 'Amigo/Familiar',  e: '👥' },
  { v: 'outro',         l: 'Outro',           e: '🔗' },
];
const PAGAMENTOS = [
  { v: 'transferencia', l: 'Transferência Bancária', e: '🏦' },
  { v: 'multicaixa',    l: 'Multicaixa',              e: '💳' },
  { v: 'dinheiro',      l: 'Dinheiro',                e: '💵' },
  { v: 'outro',         l: 'Outro',                   e: '📝' },
];

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <div className="field-error">⚠ {msg}</div>;
}

export const FormPage: React.FC = () => {
  const { formData, errors, step, set, validate, setStep, reset } = useFormState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const Icon = STEP_ICONS[step];

  const next = async () => {
    if (!validate(step)) return;
    if (step < TOTAL - 1) { setStep(step + 1); return; }
    try {
      setLoading(true);
      await submitInscricao(formData);
      setSuccess(true);
    } catch {
      alert('Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const prev = () => step > 0 && setStep(step - 1);

  return (
    <div className="page-wrapper">
      <div className="form-card">

        {/* ── CABEÇALHO ── */}
        <div className="form-card-header">
          <div className="form-logo-wrap">
            <img src={logo} alt="Phil-supplier" className="form-logo" />
          </div>
          <h1 className="form-course-name">Mega Curso de Programação</h1>
          <p className="form-course-desc">
            Aprenda do zero ao profissional com instrutores experientes e metodologia prática.
          </p>
          <div className="form-meta">
            <span className="form-meta-item">⏱ <span>12 Semanas</span></span>
            <span className="form-meta-item">💰 <span className="accent">MT 2.500</span></span>
            <span className="form-meta-item">🏆 Certificado Incluso</span>
          </div>
          <div className="form-contact" style={{ marginTop: 14 }}>
            <BsWhatsapp style={{ verticalAlign: 'middle', marginRight: 5 }} />
            <a href="https://wa.me/258840000000">+258 84 000 0000</a>
            {'  ·  '}
            <BsTelephone style={{ verticalAlign: 'middle', marginRight: 5 }} />
            <a href="tel:+258840000000">Phil-supplier Academy</a>
          </div>
        </div>

        {/* ── CORPO ── */}
        <div className="form-card-body">
          <StepsNav current={step} total={TOTAL} labels={STEPS} />

          {/* ─── PASSO 0: Dados Pessoais ─── */}
          {step === 0 && (
            <div className="step-section">
              <div className="step-title">
                <span className="step-title-icon"><Icon size={16} /></span>
                Dados Pessoais
              </div>

              <div className="form-group">
                <label>Nome Completo <span className="req">*</span></label>
                <input
                  type="text"
                  placeholder="Ex: João Manuel da Silva"
                  value={formData.nomeCompleto}
                  onChange={e => set('nomeCompleto', e.target.value)}
                  className={errors.nomeCompleto ? 'has-error' : ''}
                />
                <FieldError msg={errors.nomeCompleto} />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Data de Nascimento <span className="req">*</span></label>
                  <input
                    type="date"
                    value={formData.dataNascimento}
                    onChange={e => set('dataNascimento', e.target.value)}
                    className={errors.dataNascimento ? 'has-error' : ''}
                  />
                  <FieldError msg={errors.dataNascimento} />
                </div>
                <div className="form-group">
                  <label>Sexo <span className="req">*</span></label>
                  <select
                    value={formData.sexo}
                    onChange={e => set('sexo', e.target.value)}
                    className={errors.sexo ? 'has-error' : ''}
                  >
                    <option value="">Selecione...</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Prefiro não dizer</option>
                  </select>
                  <FieldError msg={errors.sexo} />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Telefone <span className="req">*</span></label>
                  <input
                    type="tel"
                    placeholder="+258 84 000 0000"
                    value={formData.telefone}
                    onChange={e => set('telefone', e.target.value)}
                    className={errors.telefone ? 'has-error' : ''}
                  />
                  <FieldError msg={errors.telefone} />
                </div>
                <div className="form-group">
                  <label>Email <span className="req">*</span></label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={e => set('email', e.target.value)}
                    className={errors.email ? 'has-error' : ''}
                  />
                  <FieldError msg={errors.email} />
                </div>
              </div>
            </div>
          )}

          {/* ─── PASSO 1: Curso ─── */}
          {step === 1 && (
            <div className="step-section">
              <div className="step-title">
                <span className="step-title-icon"><Icon size={16} /></span>
                Localização e Curso
              </div>

              <div className="form-group">
                <label>Província / Município <span className="req">*</span></label>
                <input
                  type="text"
                  placeholder="Ex: Maputo, Cidade"
                  value={formData.provinciaMunicipio}
                  onChange={e => set('provinciaMunicipio', e.target.value)}
                  className={errors.provinciaMunicipio ? 'has-error' : ''}
                />
                <FieldError msg={errors.provinciaMunicipio} />
              </div>

              <div className="form-group">
                <label>Curso Pretendido <span className="req">*</span></label>
                <select
                  value={formData.cursoPretendido}
                  onChange={e => set('cursoPretendido', e.target.value)}
                  className={errors.cursoPretendido ? 'has-error' : ''}
                >
                  <option value="">Selecione um curso...</option>
                  {CURSOS.map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}
                </select>
                <FieldError msg={errors.cursoPretendido} />
              </div>

              <div className="form-group">
                <label>Nível de Conhecimento em Programação <span className="req">*</span></label>
                {errors.nivelConhecimento && <FieldError msg={errors.nivelConhecimento} />}
                <div className="options-list" style={{ marginTop: 8 }}>
                  {NIVEIS.map(n => (
                    <RadioOption key={n.v} label={n.l} emoji={n.e}
                      selected={formData.nivelConhecimento === n.v}
                      onSelect={() => set('nivelConhecimento', n.v)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── PASSO 2: Infraestrutura ─── */}
          {step === 2 && (
            <div className="step-section">
              <div className="step-title">
                <span className="step-title-icon"><Icon size={16} /></span>
                Infraestrutura
              </div>

              <div className="form-group">
                <label>Possui computador? <span className="req">*</span></label>
                {errors.possuiComputador && <FieldError msg={errors.possuiComputador} />}
                <div className="options-grid-2" style={{ marginTop: 8 }}>
                  <RadioOption label="Sim, tenho" emoji="💻" selected={formData.possuiComputador === 'sim'} onSelect={() => set('possuiComputador', 'sim')} />
                  <RadioOption label="Não tenho"  emoji="❌" selected={formData.possuiComputador === 'nao'} onSelect={() => set('possuiComputador', 'nao')} />
                </div>
              </div>

              <hr className="divider" />

              <div className="form-group">
                <label>Possui acesso à internet? <span className="req">*</span></label>
                {errors.possuiInternet && <FieldError msg={errors.possuiInternet} />}
                <div className="options-grid-2" style={{ marginTop: 8 }}>
                  <RadioOption label="Sim, tenho"  emoji="📶" selected={formData.possuiInternet === 'sim'} onSelect={() => set('possuiInternet', 'sim')} />
                  <RadioOption label="Não tenho"   emoji="❌" selected={formData.possuiInternet === 'nao'} onSelect={() => set('possuiInternet', 'nao')} />
                </div>
              </div>
            </div>
          )}

          {/* ─── PASSO 3: Divulgação ─── */}
          {step === 3 && (
            <div className="step-section">
              <div className="step-title">
                <span className="step-title-icon"><Icon size={16} /></span>
                Como nos Conheceu?
              </div>

              <div className="form-group">
                <label>Selecione a origem <span className="req">*</span></label>
                {errors.comoConheceu && <FieldError msg={errors.comoConheceu} />}
                <div className="options-list" style={{ marginTop: 8 }}>
                  {REDES.map(r => (
                    <RadioOption key={r.v} label={r.l} emoji={r.e}
                      selected={formData.comoConheceu === r.v}
                      onSelect={() => set('comoConheceu', r.v)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── PASSO 4: Horário e Pagamento ─── */}
          {step === 4 && (
            <div className="step-section">
              <div className="step-title">
                <span className="step-title-icon"><Icon size={16} /></span>
                Horário e Pagamento
              </div>

              <div className="form-group">
                <label>Horário Preferido das Aulas <span className="req">*</span></label>
                {errors.horarioPreferido && <FieldError msg={errors.horarioPreferido} />}
                <div className="options-grid-2" style={{ marginTop: 8 }}>
                  <RadioOption label="Manhã" emoji="☀️" selected={formData.horarioPreferido === 'manha'} onSelect={() => set('horarioPreferido', 'manha')} />
                  <RadioOption label="Tarde" emoji="🌤️" selected={formData.horarioPreferido === 'tarde'} onSelect={() => set('horarioPreferido', 'tarde')} />
                </div>
              </div>

              <hr className="divider" />

              <div className="form-group">
                <label>Método de Pagamento <span className="req">*</span></label>
                {errors.metodoPagamento && <FieldError msg={errors.metodoPagamento} />}
                <div className="options-list" style={{ marginTop: 8 }}>
                  {PAGAMENTOS.map(p => (
                    <RadioOption key={p.v} label={p.l} emoji={p.e}
                      selected={formData.metodoPagamento === p.v}
                      onSelect={() => set('metodoPagamento', p.v)} />
                  ))}
                </div>
              </div>

              <hr className="divider" />

              <div className="form-group">
                <label>Comprovativo de Pagamento <span className="req">*</span></label>
                <FileUpload file={formData.comprovativo} onChange={f => set('comprovativo', f)} error={errors.comprovativo} />
              </div>
            </div>
          )}

          {/* ─── PASSO 5: Confirmação ─── */}
          {step === 5 && (
            <div className="step-section">
              <div className="step-title">
                <span className="step-title-icon"><Icon size={16} /></span>
                Confirmar Inscrição
              </div>

              <dl className="summary-grid">
                {[
                  ['Nome',         formData.nomeCompleto],
                  ['Email',        formData.email],
                  ['Telefone',     formData.telefone],
                  ['Localização',  formData.provinciaMunicipio],
                  ['Curso',        formData.cursoPretendido],
                  ['Nível',        formData.nivelConhecimento],
                  ['Horário',      formData.horarioPreferido],
                  ['Pagamento',    formData.metodoPagamento],
                  ['Comprovativo', formData.comprovativo?.name ?? '—'],
                ].map(([k, v]) => (
                  <div key={k} className="summary-row">
                    <dt>{k}</dt>
                    <dd>{v || '—'}</dd>
                  </div>
                ))}
              </dl>

              <div className="terms-box">
                Ao submeter este formulário, confirma que todas as informações fornecidas são
                verdadeiras e autênticas. Os seus dados serão utilizados exclusivamente para fins
                administrativos e educacionais, de acordo com a nossa política de privacidade.
              </div>

              <div className="form-group">
                {errors.aceitaTermos && <FieldError msg={errors.aceitaTermos} />}
                <CheckOption label="" checked={formData.aceitaTermos} onChange={v => set('aceitaTermos', v)}>
                  <span>Li e aceito os <strong style={{ color: 'var(--accent)' }}>Termos e Condições</strong></span>
                </CheckOption>
              </div>
            </div>
          )}

          {/* ── ACÇÕES ── */}
          <div className="form-actions">
            {step > 0 && (
              <button className="btn btn-ghost" onClick={prev}>
                <BsArrowLeft size={14} /> Voltar
              </button>
            )}
            <button className="btn btn-primary" onClick={next} disabled={loading}>
              {loading ? 'Enviando...' : step === TOTAL - 1 ? 'Confirmar Inscrição' : <>Continuar <BsArrowRight size={14} /></>}
            </button>
          </div>
        </div>
      </div>

      {success && <SuccessModal onClose={() => { setSuccess(false); reset(); }} />}
    </div>
  );
};
