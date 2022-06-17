import React, { useState } from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import Css from './SingleQuestionEdit.module.css'
import Header from '../components/Header'
import uuid from 'react-uuid'
function QuestionEdit () {
  const params = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [quizData, setquizData] = useState('');
  const [, setqesData] = useState([]);
  const [bodyData, setbodyData] = useState('');
  const [ansData, setansData] = useState();
  const [cansData, setcansData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [pointData, setPointData] = useState([]);
  const [urlData, setUrlData] = useState([]);
  const changeQuiz = async () => {
    const qes1 = {};
    if (bodyData !== undefined || bodyData === []) {
      qes1.body = bodyData
    } else {
      qes1.body = 'Unamed Question'
    }
    if (ansData) {
      qes1.ans = ansData
    } else {
      qes1.ans = []
    }
    if (cansData) {
      qes1.cans = cansData
    } else {
      qes1.cans = []
    }
    if (timeData) {
      qes1.time = timeData
    } else {
      qes1.time = 0
    }
    if (pointData) {
      qes1.mark = pointData
    } else {
      qes1.mark = 0
    }
    if (urlData) {
      qes1.url = urlData
    } else {
      qes1.url = 'https://thumbs.dreamstime.com/b/white-piece-paper-word-unknown-176624266.jpg'
    }
    const quizDataN = quizData;
    quizDataN[params.questionId] = qes1;
    console.log(quizDataN)
    try {
      const response = await fetch('http://localhost:5005/admin/quiz/' + params.quizid, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          questions: quizDataN
        }),
      });
      if (response.status === 400) {
        console.log(await response.text());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const RenderCards = () => {
    if (ansData === undefined || ansData === [] || ansData === null) {
      return <></>
    }
    const cards = ansData.map((quiz, i) => {
      let text;
      let unicode;
      if (cansData[i]) {
        text = 'Mark as incorrect answer'
        unicode = '✔'
      } else {
        text = 'Mark as correct answer'
        unicode = '❌'
      }
      return (
        <div key={uuid()} className={Css.option}>
          <div key={uuid()} className={Css.k1}>
            <p key={uuid()} className={Css.p}>Choice Option {i}</p>
            <input key={uuid()} className={Css.input2} type="text" placeholder={quiz} onBlur={e => {
              const tmp = [...ansData];
              tmp[i] = e.target.value;
              setansData(tmp);
            }
            } />
          </div>
          <div key={uuid()} className={Css.k2}>
            <button key={uuid()} className={Css.delete} onClick={() => {
              const Arr = [...ansData];
              Arr.splice(i, 1);
              setansData(Arr);
              const Arr1 = [...cansData];
              Arr1.splice(i, 1);
              setcansData(Arr1);
            }
            }>Delete{cansData[i]}</button>
            <button key={uuid()} onClick={() => {
              if (cansData[i] === true) {
                const Arry = [...cansData];
                Arry[i] = false;
                setcansData(Arry)
              } else {
                const Arry = [...cansData];
                Arry[i] = true;
                setcansData(Arry)
              }
            }}>{text}</button>
            <p key={uuid()}>{ unicode } </p>
          </div>
        </div>
      )
    });
    return (
      cards
    )
  }

  React.useEffect(async () => {
    try {
      const response = await fetch('http://localhost:5005/admin/quiz/' + params.quizid, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 403 || response.status === 400) {
        console.log(await response.text());
      }
      const data = await response.json()
      setquizData(data.questions)
      setqesData(data.questions[params.questionId])
      if (data.questions[params.questionId]) {
        setbodyData(data.questions[params.questionId].body)
      }
      if (data.questions[params.questionId]) {
        setansData(data.questions[params.questionId].ans)
      }
      if (data.questions[params.questionId]) {
        setcansData(data.questions[params.questionId].cans)
      }
      if (data.questions[params.questionId]) {
        setTimeData(data.questions[params.questionId].time)
      }
      if (data.questions[params.questionId]) {
        setPointData(data.questions[params.questionId].mark)
      }
      if (data.questions[params.questionId]) {
        setUrlData(data.questions[params.questionId].url)
      }
    } catch (err) {
      console.log(err);
    }
  }, [])

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  return <>
    <Header></Header>
    <div className={Css.body}>
      <h1>Question {params.questionId}</h1>
      <div className={Css.option1}>
        <p className={Css.p}>Question body:</p>
        <input className={Css.input} type="text" value={bodyData} onChange={e => setbodyData(e.target.value)} />
        <p className={Css.p}>Question Time Limit:</p>
        <input className={Css.input3} type="text" placeholder={timeData + ' seconds'} onChange={e => setTimeData(e.target.value)} />
        <p className={Css.p}>Question Mark:</p>
        <input className={Css.input3} type="text" placeholder={pointData + ' Point'} onChange={e => setPointData(e.target.value)} />
        <p className={Css.p}>Question Sources URL:</p>
        <input className={Css.input3} type="text" placeholder={'Source Address: ' + urlData} onChange={e => setUrlData(e.target.value)} />
        <br></br>
        <p className={Css.p}>Choices Option List:</p>
      </div>
      <RenderCards></RenderCards>
      <div className={ Css.buttonDiv}>
        <button onClick={() => {
          setansData([...ansData, []]);
          setcansData([...cansData, false]);
        }}>Add Choice Option</button>
        <button onClick={changeQuiz}>Submit</button>
      </div>

    </div>
  </>;
}

export default QuestionEdit;
