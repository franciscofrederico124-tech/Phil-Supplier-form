import styles from "./input.module.css"

interface Props {
  label: string
  type?: string
  placeholder?: string
  register: any
  name: string
  error?: string
}

export default function Input({
  label,
  type = "text",
  placeholder,
  register,
  name,
  error
}: Props)
{
  return (
    <div className={styles.container}>
      <label>{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />

      {error && <span>{error}</span>}
    </div>
  )
}
