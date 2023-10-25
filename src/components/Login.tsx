import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Login() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const isEmailValid = emailInput.includes('@') && emailInput.includes('.com');
  const isPasswordValid = passwordInput.length > 6;

  const handleClick = () => {
    navigate('/meals');
  };

  return (
    <form>
      <label>
        <input
          data-testid="email-input"
          type="text"
          placeholder="Enter your email"
          value={ emailInput }
          onChange={ (event) => setEmailInput(event.target.value) }
        />
      </label>
      <label>
        <input
          data-testid="password-input"
          type="text"
          placeholder="Enter your password"
          value={ passwordInput }
          onChange={ (event) => setPasswordInput(event.target.value) }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !isEmailValid || !isPasswordValid }
        onClick={ () => handleClick() }
      >
        Enter
      </button>
    </form>
  );
}
