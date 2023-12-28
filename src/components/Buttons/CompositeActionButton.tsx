import styles from "css/Buttons/CompositeActionButton.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
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
    <div className={[className, styles.cabContainer].join(' ')}>
      <div className={[styles.cabPrimary, childClassName].join(' ')} onClick={() => onClick("primary")} >{textPrimary}</div>
      <div className={[styles.cabUp, childClassName].join(' ')} onClick={() => onClick("up")} >
        <FontAwesomeIcon icon={faPlay} size="sm" rotation={270} />
      </div>
      <div className={[styles.cabDown, childClassName].join(' ')} onClick={() => onClick("down")} >
        <FontAwesomeIcon icon={faPlay} size="sm" rotation={90} />
      </div>
    </div>
  );
};

export default CompositeActionButton;