import { React } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import Css from './Header.module.css'
import logo from '../1.png'

function Header () {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  return <>
    <nav className={Css.nav}>
      <div className={Css.logo_container}>
        <img src={logo} className={Css.logo} alt="BigBrain logo">
        </img>
        <h1 className={Css.h1}>BigBrain</h1>
      </div>
      <button to="" className={Css.nav_item} onClick={() => { navigate(-1) }} >&#8592; Back</button>
      <Link to="../" className={Css.nav_item} onClick={async () => {
        await fetch('http://localhost:5005/admin/auth/logout', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        localStorage.removeItem('token')
      }} > Logout </Link>

    </nav>
  </>
}

export default Header;
