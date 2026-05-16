import styles from "./formHeader.module.css"

export default function FormHeader()
{
  return (
    <header className={styles.header}>
      <img
        src="/logo.png"
        alt="Logo"
        className={styles.logo}
      />

      <div className={styles.content}>
        <h1>Mega Curso Profissional</h1>

        <p>
          Formulário oficial de inscrição para os cursos
          profissionalizantes da Phil-supplier.
        </p>

        <div className={styles.infoContainer}>
          <div>
            <span>Duração</span>
            <strong>4 semanas</strong>
          </div>

          <div>
            <span>Inscrição</span>
            <strong>15.000 Kz</strong>
          </div>

          <div>
            <span>Contacto</span>
            <strong>+244 900 000 000</strong>
          </div>
        </div>
      </div>
    </header>
  )
}
