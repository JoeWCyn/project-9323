import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterCss from '../pages/Register.module.css'
// eslint-disable-next-line react/prop-types
function LoginForm ({ submit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = () => {
    submit(email, password, name);
  }
  const navigate = useNavigate();

  return (<>
    <div className={RegisterCss.RegisterForm}>
    <h1>Login</h1>
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

    <button onClick={onSubmit}>Login</button>
    <p onClick={() => navigate('../Register')}>Already has account? Register</p>
    </div>
  </>)
}

export default LoginForm;
