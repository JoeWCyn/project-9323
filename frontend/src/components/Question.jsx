/* eslint-disable react/prop-types */
import React from 'react';
import Css from './Question.module.css'
import {
  useNavigate,
} from 'react-router-dom';
import Moment from 'moment';
function Question (props) {
  const time = props.time;
  const name = props.name
  const id = props.id;
  const question = props.question;
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
  return (<>
    <div className={Css.body}>
      <h1 className={Css.h1}>{name}</h1>
      <p className={Css.p}> Create at: {Moment(time).format('DD/MM/YYYY')} </p>
      <img className={Css.img} src={imgSrc} alt="quiz_image" />
      <p className={Css.p}> Questions: {question} </p>
      <div className={Css.buttondiv}>
        <button onClick={() => navigate('../question/' + id.toString())} className={Css.button}>Edit</button>
        <button onClick={onSubmit} className={Css.buttonD}>Delete</button>
      </div>
    </div>
  </>)
}

export default Question;
