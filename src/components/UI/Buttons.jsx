export const Buttons = ({onClickHandler, value, title}) => {
    return (
       <button onClick={onClickHandler} value={value} title={title}>
            {title}
       </button>
    )
}