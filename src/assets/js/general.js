import products from "../../db/data";
import {Input} from "../../components/Input";

export const toPascalCase = (str) => {
  str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return str;
};

export function addItem(key, handleChange) {
  const setItem = [];
  for (let product of products) {
    if (!setItem.some((cat) => cat.key === product[key])) {
      setItem.push(
        <Input
          key={product[key]}
          handleChange={(e) => handleChange(e, key)}
          value={product[key]}
          title={toPascalCase(product[key])}
          name={key}
        />
      );
    }
  }
  return setItem;
};