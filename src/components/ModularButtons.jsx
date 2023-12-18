import styles from "../css/ModularButtons.module.css";

// This component is a button with two buttons on the right that act as two
// possible options for the button's behavior. May be generalized later but
// designed for the "insert new row" button now
const ButtonWithTwoModes = ({ textPrimary, onClick, className, childClassName }) => {
  return (
    <div className={[className, styles.bwtmContainer].join(' ')}>
      <div className={[styles.bwtm, styles.bwtmPrimary, childClassName].join(' ')} onClick={() => onClick("primary")} >{textPrimary}</div>
      <div className={[styles.bwtm, styles.bwtmUp, childClassName].join(' ')} onClick={() => onClick("up")} >🡅</div>
      <div className={[styles.bwtm, styles.bwtmDown, childClassName].join(' ')} onClick={() => onClick("down")} >🡇</div>
    </div>
  );
};

// This button has a left/replace/right option. If I want to generalize in future
const TripleButton = ({ activeButton, buttonLabels = [0,1,2], values = [0,1,2], onClick, className, childClassName }) => {
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

export { ButtonWithTwoModes, TripleButton };