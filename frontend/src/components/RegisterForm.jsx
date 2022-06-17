import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterCss from '../pages/Register.module.css'
// eslint-disable-next-line react/prop-types
function RegisterForm ({ submit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const onSubmit = () => {
    submit(email, password, name);
  }
  const navigate = useNavigate();

  return (<>
    <div className={RegisterCss.RegisterForm}>
    <h1>Register</h1>
    Email:
    <input
      type="text"
      onChange={e => setEmail(e.target.value)}
    /><br />
      Password:
      <input
        type="text"
        onChange={e => setPassword(e.target.value)}
      /><br />

      Name:
      <input
        type="text"
        onChange={e => setName(e.target.value)}
      /><br />

    <button onClick={onSubmit}>Register</button>
    <p onClick={() => navigate('../Login')}>Already has account? Login</p>
    </div>
  </>)
}

export default RegisterForm;
