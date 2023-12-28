import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../css/Buttons/CompositeActionButton.module.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { RowInsertDirectionTypes } from "types/commonTypes";

// This component is a button with two buttons on the right that act as two
// possible options for the button's behavior. May be generalized later but
// designed for the "insert new row" button now

interface CompositeActionButtonProps {
  textPrimary: string;
  onClick: (rowInsertDirection: RowInsertDirectionTypes) => void;
  className: string;
  childClassName: string;
};

const CompositeActionButton: React.FC<CompositeActionButtonProps> = ({ textPrimary, onClick, className, childClassName }) => {
  return (
    <div className={[className, styles.bwtmContainer].join(' ')}>
      <div className={[styles.bwtm, styles.bwtmPrimary, childClassName].join(' ')} onClick={() => onClick("primary")} >{textPrimary}</div>
      <div className={[styles.bwtm, styles.bwtmUp, childClassName].join(' ')} onClick={() => onClick("up")} >
        <FontAwesomeIcon icon={faPlay} size="sm" rotation={270} />
      </div>
      <div className={[styles.bwtm, styles.bwtmDown, childClassName].join(' ')} onClick={() => onClick("down")} >
        <FontAwesomeIcon icon={faPlay} size="sm" rotation={90} />
      </div>
    </div>
  );
};

export default CompositeActionButton;