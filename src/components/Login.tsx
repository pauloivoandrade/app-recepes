import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../css/login.css';
import imageIcon from '../images/logoSemFundo.jpg';

export function Login() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const isEmailValid = emailInput.includes('@') && emailInput.includes('.com');
  const isPasswordValid = passwordInput.length > 6;

  const handleClick = () => {
    const userEmail = { email: emailInput };
    localStorage.setItem('user', JSON.stringify(userEmail));
    navigate('/meals');
  };

  return (
    <section className="mainLogin">
      <div className="formLogin">
        <img src={ imageIcon } alt="Icon" />
        <input
          data-testid="email-input"
          type="text"
          placeholder="Enter your email"
          value={ emailInput }
          onChange={ (event) => setEmailInput(event.target.value) }
        />
        <input
          data-testid="password-input"
          type="text"
          placeholder="Enter your password"
          value={ passwordInput }
          onChange={ (event) => setPasswordInput(event.target.value) }
        />
        <button
          className="btnLogin"
          data-testid="login-submit-btn"
          type="button"
          disabled={ !isEmailValid || !isPasswordValid }
          onClick={ () => handleClick() }
        >
          Enter
        </button>
      </div>
    </section>
  );
}
