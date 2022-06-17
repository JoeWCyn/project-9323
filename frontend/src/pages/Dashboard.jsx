import React, { useState } from 'react'
import {
  useNavigate,
} from 'react-router-dom';
import Css from './Dashboard.module.css'
import Header from '../components/Header'
import Card from '../components/DashboardCard'
import uuid from 'react-uuid'
function Dashboard () {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [renderList, updateRenderList] = useState([]);
  const [qesL, updateqesL] = useState([]);
  const [sessionId, setUrl] = useState('');
  const [sessionName, setName] = useState('');
  let data = []
  const onSubmit = async () => {
    await fetch('http://localhost:5005/admin/quiz/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: 'Unamed New Game'
      })
    });
    window.location.reload(false);
  }
  const getQ = async (array) => {
    const resArr = [];
    for (const x in array) {
      const response = await fetch('http://localhost:5005/admin/quiz/' + array[x].id, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      data = await response.json();
      resArr.push(data.questions.length)
    }
    return resArr;
  }
  const RenderCards = () => {
    const cards = renderList.map((quiz, i) => {
      return (
        <Card
          time={quiz.createAt}
          name={quiz.name}
          id={quiz.id}
          question={qesL[i]}
          img={quiz.thumbnail}
          key={uuid()}>
      </Card>)
    });
    return (
      cards
    )
  }
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  React.useEffect(async () => {
    try {
      const response = await fetch('http://localhost:5005/admin/quiz', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 403) {
        console.log(await response.text());
      }
      data = await response.json();
      const array = data.quizzes;
      let Arr = [];
      getQ(array).then((res) => {
        Arr = res;
        updateqesL(Arr);
      });
      updateRenderList(data.quizzes);
    } catch (err) {
      console.log(err);
    }
  }, [])

  return <>
    <Header></Header>
    <h1 className={Css.h1}>Dashboard</h1>
    <div className={Css.inputDiv}>
      <p>Join Quiz Session </p>
      <input className={Css.input} type="text" placeholder={'Enter your Name'} onBlur={e => setName(e.target.value)} />
      <input className={Css.input} type="text" placeholder={'Enter the Session ID of the quiz you want to Join'} onBlur={e => setUrl(e.target.value)} />
      <button onClick={async () => {
        try {
          if (sessionName === '') {
            alert('Please enter name');
            return;
          }
          if (sessionId === '') {
            alert('Please enter session ID');
            return;
          }
          const response = await fetch('http://localhost:5005/play/join/' + sessionId, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: sessionName
            })
          });
          if (response.status !== 200) {
            alert('Please check if the session is correct');
            return;
          }
          const data2 = await response.json();
          navigate('../quiz/' + sessionId + '/' + data2.playerId);
        } catch (err) {
          alert('Please check if the session is correct')
        }
      }}> Join </button>
    </div>
    <div className={Css.body}>
      <RenderCards></RenderCards>
    </div>
    <div className={Css.buttondiv} >
      <button onClick={onSubmit}> Create New Quiz </button>
    </div>
  </>;
}

export default Dashboard;
