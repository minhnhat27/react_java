import style from './Loading.module.scss'

export default function Loading() {
  return (
    <>
      <div className={style.loadingOverlay}>
        <div className={style.loader}></div>
      </div>
    </>
  )
}
