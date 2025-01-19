// Button.jsx

import React from 'react';
import './button.css';

 
const Button = ({ text, effectType, onClick, disabled = false, ...props }) => {
  return (
    <button style={{ margin: "10px" }} className={`custom-button ${effectType}`} onClick={onClick} disabled={disabled} {...props}>
      {text}
    </button>
  );
};
 

export default Button;

