/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Css from './DashBoardCard.module.css'
import {
  useNavigate,
} from 'react-router-dom';
import Moment from 'moment';
import PopupWin from '../components/PopupWin';
function DashboardCard (props) {
  const time = props.time;
  const name = props.name
  const id = props.id;
  const question = props.question;
  const [errorPopup, setErrorPopup] = useState(false);
  const [resPopup, setResPopup] = useState(false);
  const [sesID, setSessionID] = useState(0);
  const [btn, setBtn] = useState('Start');
  const [btnStyle, setBtnStyle] = useState({})
  let imgSrc;

  if (props.img !== null) {
    imgSrc = props.img
  } else {
    imgSrc = 'https://canopylab.com/wp-content/uploads/2020/05/Working-with-adaptive-quizzes-A-beginners-guide.jpg'
  }

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const onSubmit = async () => {
    await fetch('http://localhost:5005/admin/quiz/' + props.id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    window.location.reload(false);
  }
  const onStart = async () => {
    if (btn === 'Start') {
      await fetch('http://localhost:5005/admin/quiz/' + props.id + '/start', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    } else if (btn === 'Stop') {
      await fetch('http://localhost:5005/admin/quiz/' + props.id + '/end', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    }
    await fetch('http://localhost:5005/admin/quiz/' + props.id + '/advance', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  }
  const getSession = async () => {
    const response = await fetch('http://localhost:5005/admin/quiz/' + props.id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();

    return data.active;
  }
  React.useEffect(() => {
    let cancel = false;
    getSession().then((res) => {
      if (cancel) return;
      setSessionID(res);
      if (res === null) {
        setBtn('Start');
        setBtnStyle({
          backgroundColor: 'green'
        });
      } else {
        setBtn('Stop');
        setBtnStyle({
          backgroundColor: 'red'
        });
      }
    });
    return () => {
      cancel = true;
    }
  }, [])

  return (<>
    <PopupWin trigger={errorPopup} setTrigger={setErrorPopup} message={'Your Session ID is ' + sesID + ' , please copy it and publish to the users'}>
    </PopupWin>
    <PopupWin nav={'../quiz/result/' + sesID} content='View Result' trigger={resPopup} setTrigger={setResPopup} message={'Successfully terminate the quiz'}>
    </PopupWin>
    <div className={Css.body}>
      <h1 className={Css.h1}>{name}</h1>
      <img className={Css.img} src={imgSrc} alt="quiz_image" />
      <p className={Css.p}> Questions: {question} </p>
      <p className={Css.p}> SessionID: { sesID }</p>
      <p className={Css.p}> Create at: {Moment(time).format('DD/MM/YYYY')} </p>
      <div className={Css.buttondiv}>
        <button onClick={() => navigate('../quizEdit/' + id.toString())} className={Css.button}>Edit</button>
        <button onClick={onSubmit} className={Css.buttonD}>Delete</button>
      </div>
      <button className={Css.start} style={btnStyle} onClick={() => {
        if (btn === 'Stop') {
          onStart().then(setResPopup(true))
        } else {
          onStart().then(() => {
            getSession().then((res) => {
              setSessionID(res);
            }).then(() => {
              setErrorPopup(true)
            })
          });
        }
      }
      }> {btn}</button>
    </div>
  </>)
}

export default DashboardCard;
