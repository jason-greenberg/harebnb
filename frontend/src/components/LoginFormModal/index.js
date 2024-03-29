import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    setDisabled(credential.length < 4 || password.length < 6);
  }, [credential, password]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const signInAsDemoUser = (e) => {
    e.preventDefault();
    dispatch(sessionActions.loginDemoUser())
      .then(closeModal);
    <Redirect to="/" />
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className="form-container">
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        {errors.map((error, idx) => (
            <li 
              key={idx}
              className="error-message"
            >
              {error}
            </li>
        ))}
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder='Username'
          autoComplete='username'
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='Password'
          autoComplete='current-password'
        />
        <button 
          type="submit" 
          className={`login-button ${disabled ? 'disabled' : ''} `}
          disabled={disabled}
        >
          LogIn
        </button>
        <button 
          className="login-demo-button"
          onClick={signInAsDemoUser}
        >
          Log in as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
