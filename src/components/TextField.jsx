import styles from "../css/TextField.module.css";
import { getTextWidth } from "../utils";

const TextField = ({content, onClick, onChange}) => {

  const handleClick = (e) => { e.stopPropagation(); onClick(); };
  const fieldWidth = getTextWidth(content, "19.2px segoe ui semibold");

  return (
    <input
      className={[styles.textBox].join(' ')}
      value={content}
      style={{width: fieldWidth}}
      autoFocus
      onClick={(e) => handleClick(e)}
      onChange={(e) => onChange(e.target.value)}
    />);

}

export default TextField;