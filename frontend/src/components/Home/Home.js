import React, { useState } from 'react';
import Navbar from '../NavBar/Navbar';

import LoggedNarbar from '../LoggedNavBar/Navbar'
import { fetchDashboard } from '../../service.js';

const Home = () => {
  const [data, setData] = useState('');
  console.log(localStorage.getItem('sign-status'));

  React.useEffect(async (e) => {
    try {
      const response = await fetchDashboard({ });
      console.log(response.data.message.page);
      setData(response.data.message.page);
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <div className="home">
      {localStorage.getItem('sign-status')
        ? <LoggedNarbar></LoggedNarbar>
        : <Navbar></Navbar>}
      <div>Get data from backend: {data}</div>
    </div>
  );
}
export default Home;
