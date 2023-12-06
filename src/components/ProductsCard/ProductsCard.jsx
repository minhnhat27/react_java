import style from './ProductsCard.module.scss'
export const ProductsCard = ({ result }) => {
  return <section className={`${style.cardContainer} p-3`}>{result}</section>
}
