import styles from "css/Buttons/TriStateSwitch.module.css";
import React, { SetStateAction } from "react";
import { InsertBehaviorTypes } from "types/commonTypes";

// These types are bad. I don't want to spend too much time on this right now though
// My onclick excepts InsertBehaviorTypes which is just a type union of the three values.
// So its really bad haha.
interface TriStateSwitchProps {
  activeButton: string;
  buttonLabels: [React.ReactNode, React.ReactNode, React.ReactNode];
  values: InsertBehaviorTypes[];
  onClick: React.Dispatch<SetStateAction<InsertBehaviorTypes>>;
  className: string | string[];
  childClassName: string | string[];
};

// This button has a left/replace/right option. If I want to generalize in future
const TriStateSwitch: React.FC<TriStateSwitchProps> =
  ({ activeButton, buttonLabels = [0,1,2], values = ["left", "replace", "right"], onClick, className, childClassName }) => {
  // Handle possibility of being passed an array of classes as strings
  const formattedClassName = Array.isArray(className) ? className.join(' ') : className;
  const formattedChildClassName = Array.isArray(childClassName) ? childClassName.join(' ') : childClassName;

  // Helpers
  const formattedActiveButton = activeButton == null ? values[1] : activeButton;
  const buttonStyles = [styles.tbLeft, styles.tbCenter, styles.tbRight];

  return (
    <div className={[formattedClassName, styles.tbContainer].join(' ')}>
      {[0,1,2].map((i) => {
        const isActiveButton = formattedActiveButton === values[i];
        return (
          <div
            className={[buttonStyles[i], formattedChildClassName, isActiveButton ? styles.tbActiveButton : ""].join(' ')}
            onClick={() => onClick(values[i])}
            key={i}
          >
            {buttonLabels[i]}
          </div>
        );
      })}
    </div>
  );
};

export default TriStateSwitch;