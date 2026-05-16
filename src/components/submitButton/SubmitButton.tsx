import styles from "./submitButton.module.css"

export default function SubmitButton()
{
  return (
    <button className={styles.button} type="submit">
      Finalizar Inscrição
    </button>
  )
}
