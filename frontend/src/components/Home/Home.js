import React from 'react';

import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar'
const Home = () => {
  console.log(localStorage.getItem('sign-status'));
  return (
    <div className="home">
      {localStorage.getItem('sign-status')
        ? <LoggedNarbar></LoggedNarbar>
        : <Navbar></Navbar>}
    </div>
  );
}
export default Home;
