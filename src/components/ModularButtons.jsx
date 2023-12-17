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
}





// Another button to make here that is three way for left/replace/right for
// inserting an element with respect to the cursor
export { ButtonWithTwoModes };