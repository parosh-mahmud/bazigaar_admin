import React, { useEffect, useState } from "react";
import styles from "../../Styles/ToggleButton.module.css";

const ToggleButton = ({ apiStatus }) => {
  const [isChecked, setIsChecked] = useState(apiStatus);
  // useEffect(() => {
  //   setIsChecked((prevChecked) => !prevChecked);
  // }, [apiStatus]);

  const handleChange = () => {};
  console.log("isChecked", isChecked);
  return (
    <label className={styles.toggleContainer}>
      <input
        type="checkbox"
        className={styles.toggleInput}
        checked={isChecked}
        onChange={handleChange}
      />
      <div className={styles.toggleSlider}></div>
    </label>
  );
};

export default ToggleButton;
