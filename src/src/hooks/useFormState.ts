import { useState } from 'react';
import { FormData, FormErrors } from '../types/form.types';

const initial: FormData = {
  nomeCompleto: '',
  dataNascimento: '',
  sexo: '',
  telefone: '',
  email: '',
  provinciaMunicipio: '',
  cursoPretendido: '',
  nivelConhecimento: '',
  possuiComputador: '',
  possuiInternet: '',
  comoConheceu: '',
  horarioPreferido: '',
  metodoPagamento: '',
  comprovativo: null,
  aceitaTermos: false,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useFormState() {
  const [formData, setFormData] = useState<FormData>(initial);
  const [errors, setErrors]     = useState<FormErrors>({});
  const [step, setStep]         = useState(0);

  const set = (field: keyof FormData, value: unknown) => {
    setFormData(p => ({ ...p, [field]: value }));
    setErrors(p => ({ ...p, [field]: undefined }));
  };

  const validate = (s: number): boolean => {
    const e: FormErrors = {};
    if (s === 0) {
      if (!formData.nomeCompleto.trim())              e.nomeCompleto      = 'Nome obrigatório';
      if (!formData.dataNascimento)                   e.dataNascimento    = 'Data obrigatória';
      if (!formData.sexo)                             e.sexo              = 'Selecione uma opção';
      if (!formData.telefone.trim())                  e.telefone          = 'Telefone obrigatório';
      if (!formData.email.trim())                     e.email             = 'Email obrigatório';
      else if (!emailRegex.test(formData.email))      e.email             = 'Email inválido';
    }
    if (s === 1) {
      if (!formData.provinciaMunicipio.trim())        e.provinciaMunicipio = 'Campo obrigatório';
      if (!formData.cursoPretendido)                  e.cursoPretendido   = 'Selecione um curso';
      if (!formData.nivelConhecimento)                e.nivelConhecimento = 'Selecione seu nível';
    }
    if (s === 2) {
      if (!formData.possuiComputador)                 e.possuiComputador  = 'Responda esta pergunta';
      if (!formData.possuiInternet)                   e.possuiInternet    = 'Responda esta pergunta';
    }
    if (s === 3) {
      if (!formData.comoConheceu)                     e.comoConheceu      = 'Selecione uma opção';
    }
    if (s === 4) {
      if (!formData.horarioPreferido)                 e.horarioPreferido  = 'Selecione um horário';
      if (!formData.metodoPagamento)                  e.metodoPagamento   = 'Selecione um método';
      if (!formData.comprovativo)                     e.comprovativo      = 'Envie o comprovativo';
    }
    if (s === 5) {
      if (!formData.aceitaTermos)                     e.aceitaTermos      = 'Aceite os termos para continuar';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const reset = () => { setFormData(initial); setErrors({}); setStep(0); };

  return { formData, errors, step, set, validate, setStep, reset };
}
