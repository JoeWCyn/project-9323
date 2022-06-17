import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../1.png'
import welcomeCss from './Welcome.module.css'
function Welcome () {
  const navigate = useNavigate();
  return (
    <div className={welcomeCss.body}>
      <img src={logo} className={welcomeCss.img}></img>
      <h1 className={welcomeCss.h1}>BigBrain ™</h1>
      <button className={welcomeCss.button} onClick={() => navigate('./register')} >Start Now</button>
    </div>
  );
}

export default Welcome;
