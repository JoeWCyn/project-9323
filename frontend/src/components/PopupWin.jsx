import React from 'react';
import Css from './PopupWin.module.css'
import {
  useNavigate,
} from 'react-router-dom';
function PopupWin (prop) {
  const navigate = useNavigate();
  if (prop.trigger) {
    if (prop.nav) {
      return (
        <div className={Css.popupWindows}>
          <div>
            <div className={Css.text}>
              <h1>Alert</h1>
              <p>{prop.message}</p>
              <button className={Css.button} onClick={() => { prop.setTrigger(false); navigate(prop.nav) }}>{prop.content}</button>
              <button className={Css.button} onClick={() => { prop.setTrigger(false); window.location.reload(false); }}>Close</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={Css.popupWindows}>
          <div>
            <div className={Css.text}>
              <h1>Alert</h1>
              <p>{prop.message}</p>
              <button className={Css.button} onClick={() => { prop.setTrigger(false); window.location.reload(false); }}>Close</button>
            </div>
          </div>
        </div>
      )
    }
  } else {
    return '';
  }
}

export default PopupWin;
