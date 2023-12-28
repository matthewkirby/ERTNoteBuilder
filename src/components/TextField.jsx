import styles from "css/TextField.module.css";
import { getTextWidth } from "utils/formatting";

// When I click to add a new row at the top, a text field is getting selected
// Handle max width to prevent clipping out of app

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
      onFocus={(e) => e.target.select()}
    />);

}

export default TextField;