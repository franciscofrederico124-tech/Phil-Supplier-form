import * as yup from "yup"

export const formSchema = yup.object({
  fullName: yup.string().required("Nome obrigatório"),
  birthDate: yup.string().required("Data obrigatória"),
  gender: yup.string().required("Sexo obrigatório"),
  phone: yup.string().required("Telefone obrigatório"),
  email: yup
    .string()
    .email("E-mail inválido")
    .required("E-mail obrigatório"),
  location: yup.string().required("Localização obrigatória"),
  course: yup.string().required("Curso obrigatório"),
  level: yup.string().required("Nível obrigatório"),
  hasComputer: yup.string().required("Campo obrigatório"),
  hasInternet: yup.string().required("Campo obrigatório"),
  source: yup.string().required("Campo obrigatório"),
  schedule: yup.string().required("Campo obrigatório"),
  paymentMethod: yup.string().required("Campo obrigatório"),
  acceptedTerms: yup
    .boolean()
    .oneOf([true], "Aceite os termos")
})
