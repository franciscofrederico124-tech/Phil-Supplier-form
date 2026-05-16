import styles from "./home.module.css"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { formSchema } from "../../schemas/formSchema"

import FormHeader from "../../components/formHeader/FormHeader"
import Input from "../../components/input/Input"
import RadioGroup from "../../components/radioGroup/RadioGroup"
import UploadField from "../../components/uploadField/UploadField"
import SubmitButton from "../../components/submitButton/SubmitButton"

export default function Home()
{
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(formSchema)
  })

  function onSubmit(data: any)
  {
    alert(data)
  }

  return (
    <main className={styles.container}>
      <div className={styles.formWrapper}>
        <FormHeader />

        <form onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.section}>
            <Input
              label="Nome completo"
              name="fullName"
              register={register}
              error={errors.fullName?.message as string}
            />

            <Input
              label="Data de nascimento"
              name="birthDate"
              register={register}
              error={errors.birthDate?.message as string}
            />

            <Input
              label="Número de telefone"
              name="phone"
              register={register}
              error={errors.phone?.message as string}
            />

            <Input
              label="E-mail válido (Opcional)"
              type="email"
              name="email"
              register={register}
             />
          </section>

          <section className={styles.section}>
            <RadioGroup
              title="Sexo"
              name="gender"
              options={["Masculino", "Feminino"]}
              register={register}
              error={errors.gender?.message as string}
            />

            <RadioGroup
              title="Horário preferido"
              name="schedule"
              options={["Manhã", "Tarde"]}
              register={register}
              error={errors.schedule?.message as string}
            />
            <RadioGroup
              title="Como encontrou a Phil "
              name="comoenc"
              options={["Pelo Facebook", "Pelo Instragram", "Por um familiar", "Por um cartaz", "Outro"]}
              register={register}
              error={errors.schedule?.message as string}
            />
          </section>

          <section className={styles.section}>
            <UploadField register={register} />

            <label className={styles.terms}>
              <input
                type="checkbox"
                {...register("acceptedTerms")}
              />

              Aceito os termos e condições
            </label>

            <p className={styles.error}>
              {errors.acceptedTerms?.message as string}
            </p>

            <SubmitButton />
          </section>
        </form>
      </div>
    </main>
  )
}
