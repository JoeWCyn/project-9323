import React, { useState } from 'react';
import {
  useParams
} from 'react-router-dom';
import Css from './QuizStart.module.css'
import Header from '../components/Header'
import uuid from 'react-uuid'
import Countdown from 'react-countdown';
function QuizStart () {
  const params = useParams();
  const [qesData, setqesData] = useState([]);
  const [ansData, setansData] = useState([]);
  const [qesType, setqesType] = useState('Single Choice');
  const Renderchoice = (props) => {
    if (props.body === undefined || props.body === []) {
      return <></>
    }
    const forms = props.body.map((res, j) => {
      return (
        <div key={uuid()}>
          <input type='checkbox' className={Css.choice} checked={ansData[j]} key={uuid()} onChange={() => {
            const Arry = [...ansData];
            Arry[j] = !ansData[j];
            setansData(Arry)
          }} /> {res}
          <br></br>
        </div>
      )
    });
    return (
      forms
    )
  }
  const AnsRender = (props) => {
    return <></>
  }

  React.useEffect(async () => {
    try {
      const response = await fetch('http://localhost:5005/play/' + params.playerId + '/question', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        }
      });
      const data = await response.json()
      console.log(data.question);
      setqesData(data.question)
      const Arry = [];
      for (let i = 0; i < data.question.ans.length; i++) {
        Arry.push(false);
      }
      let qesC = 0;
      for (let i = 0; i < data.question.cans.length; i++) {
        if (data.question.cans[i]) {
          qesC++;
        }
      }
      if (qesC === 1) {
        setqesType('Single Choice')
      } else {
        setqesType('Muiltple Choice')
      }
      setansData(Arry);
    } catch (err) {
      console.log(err);
    }
  }, [])

  return <>
    <Header></Header>
    <div className={Css.body}>
      <h1>Quiz</h1>
      <div className={Css.qestion}>
        <h2>{qesData.body}</h2>
        <p>{qesType}</p>
        <img className={Css.img}
            src={qesData.url}
          title="Question source" alt="Question source"
        />
        <span>Time Left:</span>
        <Countdown
          zeroPadTime={2}
          zeroPadDays={0}
          daysInHours={true}
          renderer={props => <div>{props.seconds}</div>}
          onComplete={() => { console.log('yes') }} date={Date.now() + (1 * 10000)} />
        <br></br>
        <div className={Css.ansDiv}>
          <Renderchoice body={qesData.ans} ></Renderchoice>
        </div>
        <button onClick={async () => {
          const response = await fetch('http://localhost:5005/play/' + params.playerId + '/answer', {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              answerIds: ansData,
            })
          })
          console.log(await response.text())
        }}> Submit</button>
        <AnsRender ></AnsRender>
      </div>
    </div>
  </>;
}

export default QuizStart;
