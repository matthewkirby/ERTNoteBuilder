import styles from "css/TextField.module.css";
import React from "react";
import { getTextWidth } from "utils/formatting";

 interface TextFieldProps {
    content: string;
    onClick: () => void;
    onChange: (e: string) => void;
 }

const TextField: React.FC<TextFieldProps> = ({content, onClick, onChange}) => {
  const fieldWidth = getTextWidth(content, "19.2px segoe ui semibold");
  return (
    <input
      className={[styles.textBox].join(' ')}
      value={content}
      style={{width: fieldWidth}}
      autoFocus
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => e.target.select()}
    />);
}

export default TextField;