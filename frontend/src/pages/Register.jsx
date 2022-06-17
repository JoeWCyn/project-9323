import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { React, useState } from 'react'
import PopupWin from '../components/PopupWin';
import RegisterCss from './Register.module.css'
function Register () {
  const navigate = useNavigate();
  const [errorPopup, setErrorPopup] = useState(false);
  return <>
    <div className={RegisterCss.Register}>
      <PopupWin className='PopupWin' trigger={errorPopup} setTrigger={setErrorPopup} message='Account Exsit!'>
      </PopupWin>
      <RegisterForm submit={async (email, password, name) => {
        const response = await fetch('http://localhost:5005/admin/auth/register', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            name,
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

export default Register;
