import style from '../../components/ProductsSidebar/Sidebar.module.scss'

export const Input = ({ handleChange, value, title, name }) => {
  return (
    <label className={style.sidebarLabelContainer}>
      <input type="radio" value={value} name={name} onChange={handleChange} />
      <span className={style.checkmark}></span>
      {title}
    </label>
  )
}
