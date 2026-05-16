import styles from "./radioGroup.module.css"

interface Props {
  title: string
  options: string[]
  register: any
  name: string
  error?: string
}

export default function RadioGroup({
  title,
  options,
  register,
  name,
  error
}: Props)
{
  return (
    <div className={styles.container}>
      <h3>{title}</h3>

      <div className={styles.options}>
        {options.map(option => (
          <label key={option}>
            <input
              type="radio"
              value={option}
              {...register(name)}
            />

            {option}
          </label>
        ))}
      </div>

      {error && <span>{error}</span>}
    </div>
  )
}
