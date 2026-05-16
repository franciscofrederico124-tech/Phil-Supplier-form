export interface FormData {
  nomeCompleto: string;
  dataNascimento: string;
  sexo: string;
  telefone: string;
  email: string;
  provinciaMunicipio: string;
  cursoPretendido: string;
  nivelConhecimento: string;
  possuiComputador: string;
  possuiInternet: string;
  comoConheceu: string;
  horarioPreferido: string;
  metodoPagamento: string;
  comprovativo: File | null;
  aceitaTermos: boolean;
}

export type FormErrors = Partial<Record<keyof FormData, string>>;

export interface StepConfig {
  title: string;
  icon: string;
}
