import React from 'react'
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import Css from './Result.module.css'
import Header from '../components/Header'
function Result () {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const params = useParams();
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  React.useEffect(async () => {
    try {
      const response = await fetch('http://localhost:5005/admin/session/' + params.quizId + '/results', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 403) {
        console.log(await response.text());
      }
      const data = await response.json();
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  }, [])

  return <>
    <Header></Header>
    <h1 className={Css.h1}> Hi {params.quizId} </h1>

  </>;
}

export default Result;
