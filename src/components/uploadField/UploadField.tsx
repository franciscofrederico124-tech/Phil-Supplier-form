import styles from "./uploadField.module.css"

interface Props {
  register: any
}

export default function UploadField({ register }: Props)
{
  return (
    <div className={styles.container}>
      <label>Comprovativo de pagamento ( Opcional )</label>

      <input
        type="file"
        accept="image/*,.pdf"
        {...register("paymentProof")}
      />
    </div>
  )
}
