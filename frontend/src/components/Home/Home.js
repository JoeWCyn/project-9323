import React from 'react';
import Navbar from '../NavBar/Navbar';

import LoggedNarbar from '../LoggedNavBar/Navbar'

const Home = () => {
  console.log(localStorage.getItem('token'));

  /*   React.useEffect(async (e) => {
    try {
      const response = await fetchDashboard({ });
      console.log(response.data.message.page);
      setData(response.data.message.page);
    } catch (error) {
      alert(error);
    }
  }, []); */

  return (
    <div className="home">
      {localStorage.getItem('token')
        ? <LoggedNarbar></LoggedNarbar>
        : <Navbar></Navbar>}
    </div>
  );
}
export default Home;
