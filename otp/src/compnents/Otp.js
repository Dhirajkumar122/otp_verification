import React, { useRef } from 'react';
import './otp.css';

const Otp = () => {
  const inputRefs = useRef([]);

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    if (/^\d$/.test(value)) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      event.target.value = '';
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && index > 0 && event.target.value === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className='otpInputBox'>
      <h1>OTP Verification</h1>
      <div className='otpContainer'>
        {Array(4).fill('').map((_, index) => (
          <input
            key={index}
            type='text'
            maxLength='1'
            className='otpInput'
            ref={el => inputRefs.current[index] = el}
            onChange={event => handleInputChange(event, index)}
            onKeyDown={event => handleKeyDown(event, index)}
          />
        ))}
      </div>
      <div className='verifyButton'><button>Verify</button></div>
      
    </div>
  );
}

export default Otp;
