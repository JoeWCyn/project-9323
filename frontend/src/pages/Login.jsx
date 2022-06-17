import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { React, useState } from 'react'
import PopupWin from '../components/PopupWin';
import RegisterCss from './Register.module.css'
function Login () {
  const navigate = useNavigate();
  const [errorPopup, setErrorPopup] = useState(false);
  return <>
    <div className={RegisterCss.Register}>
      <PopupWin trigger={errorPopup} setTrigger={setErrorPopup} message='Password dont match!'>
      </PopupWin>
      <LoginForm submit={async (email, password, name) => {
        const response = await fetch('http://localhost:5005/admin/auth/Login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          })
        });

        const data = await response.json();
        localStorage.setItem('token', data.token);
        if (data.token === undefined) {
          setErrorPopup(true)
        } else {
          navigate('/dashboard');
        }
      }} />
    </div>
  </>;
}

export default Login;
