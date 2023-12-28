import React, { useState } from 'react';

import styles from './popup.module.css';

function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const popupStyle = {
    transform: `translateY(${isOpen ? 0 : '100%'})`,
    transition: 'transform 0.3s ease-in-out',
  };

  return (
    <>
      <button onClick={openPopup}>Open Popup</button>
      <div className={styles.popup} style={popupStyle}>
        <button onClick={closePopup}>Close Popup</button>
        <p>This is a popup!</p>
      </div>
    </>
  );
}

export default Popup;
