import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    isDisabled();
    const validationErrors = validate();
    if (validationErrors.length > 0) setErrors(validationErrors);
    else setErrors([]);
  }, [
    email,
    username,
    firstName,
    lastName,
    password,
    confirmPassword
  ])

  if (sessionUser) return <Redirect to="/" />;

  const isDisabled = () => {
    if (
      email
      && username
      && firstName
      && lastName
      && password
      && confirmPassword
      && username.length >= 4
      && password.length >= 6
      && password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  const validate = () => {
    const validationErrors = [];
    if (username && username.length < 4) {
      validationErrors.push('Username must be 4 characters or longer');
    }
    if (password && password.length < 6) {
      validationErrors.push('Password must be 6 characters or longer');
    }
    if (password && confirmPassword && password !== confirmPassword) {
      validationErrors.push('Passwords do not match');
    }
    return validationErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </label>
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </label>
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
        </label>
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
        </label>
        <button 
          type="submit" 
          className={`signup-button ${disabled ? 'disabled' : ''} `}
          disabled={disabled}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
