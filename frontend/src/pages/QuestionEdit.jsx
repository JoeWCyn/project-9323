import React, { useState } from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import Css from './QuestionEdit.module.css'
import Header from '../components/Header'
import Moment from 'moment';
import uuid from 'react-uuid'
function QuestionEdit () {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [imgUrl, setimgURL] = useState('');
  const [quizData, setquizData] = useState('');
  const [qesData, setqesData] = useState([]);
  const token = localStorage.getItem('token');

  const changeQuiz = async () => {
    try {
      const response = await fetch('http://localhost:5005/admin/quiz/' + params.questionId, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          thumbnail: imgUrl,
          questions: qesData
        }),
      });
      console.log(await response.text())
      if (response.status === 400) {
        console.log(await response.text());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Renderchoice = (props) => {
    if (props.body.ans === undefined || props.body.ans === []) {
      return <></>
    }
    const forms = props.body.ans.map((res, j) => {
      return (
        <div className={Css.choicetext} key={uuid()}>
          <p className={Css.choice} key={uuid()}> {String.fromCharCode(j + 65)} : {res}</p>
          <br></br>
        </div>
      )
    });
    return (
      forms
    )
  }

  const Renderform = () => {
    const forms = qesData.map((qes, j) => {
      return (
          <div key={uuid()} className={Css.qesDiv}>
            <p key={uuid()} className={Css.title}> Question {j} </p>
            <p key={uuid()} className={Css.sub}> ( { qes.mark} point, Time Limit {qes.time} s )</p>
            <p key={uuid()} className={Css.qes} > Q: {qes.body} </p>
            <img className={Css.img}
              src={qes.url}
            title="Question source" alt="Question source"
          />
          <br></br>
            <div className={Css.choice}>
              <Renderchoice body={qes}></Renderchoice>
            </div>
            <div className={Css.buttonDiv}>
              <button onClick={() => navigate(j.toString())} className={Css.button}>Edit</button>
              <button className={Css.buttonR} key={uuid()} onClick={() => {
                const Arr = [...qesData];
                Arr.splice(j, 1);
                setqesData(Arr);
              }}>Delete</button>
            </div>
          </div>
      )
    });
    return (
      forms
    )
  }

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  React.useEffect(async () => {
    try {
      const response = await fetch('http://localhost:5005/admin/quiz/' + params.questionId, {
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
      setquizData(data);
      setqesData(data.questions)
    } catch (err) {
      console.log(err);
    }
  }, [])

  return <>
    <Header></Header>
    <div className={Css.body}>
      <h1>Quiz Editor</h1>
      <p>Last modified: {Moment(quizData.createAt).format('DD/MM/YYYY')}</p>
      <p> Quiz name:</p>
      <input type="text" placeholder={quizData.name} onChange={e => setName(e.target.value)} />
      <p> Quiz thumbnail Url:</p>
      <input type="text" placeholder={quizData.thumbnail} onChange={e => setimgURL(e.target.value)} />
      <br></br><br></br>
      <Renderform key='sasdf'></Renderform>
      <button onClick={() => {
        const Arr = [...qesData];
        const qes1 = {};
        qes1.body = 'Unamed Question'
        qes1.time = 0
        qes1.mark = 0
        qes1.ans = []
        qes1.cans = []
        qes1.url = 'https://thumbs.dreamstime.com/b/white-piece-paper-word-unknown-176624266.jpg'
        Arr.push(qes1);
        fetch('http://localhost:5005/admin/quiz/' + params.questionId, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name,
            thumbnail: imgUrl,
            questions: Arr
          }),
        }).then(setqesData(Arr))
      }}>New Question</button>
      <button onClick={changeQuiz}>Submit</button>
    </div>
  </>;
}

export default QuestionEdit;
