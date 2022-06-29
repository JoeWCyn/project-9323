import React from 'react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import Box from '@mui/material/Box';
import Photo from '../../profile.jpg';
import styles from './Profile.module.css';
const App = () => {
  React.useEffect(() => {

  }, [])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>{localStorage.getItem('token') ? (<LoggedNarbar></LoggedNarbar>) : (<Navbar></Navbar>)}
      <Box sx={{ display: 'flex', mt: 30, width: '60%', height: '60vh', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderWidth: '0px', borderStyle: 'solid' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%', height: '50vh', backgroundColor: 'white', borderColor: 'gray', justifyContent: 'flex-start', alignItems: 'center', borderWidth: '0px', borderStyle: 'solid', margin: '5px' }}>
          <div className={styles.profileLogo}>
            <img src={Photo} alt="Logo" className={styles.logo} />
          </div>
          <button className={styles.button}> Change </button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '10%', height: '50vh', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderColor: 'gray', borderWidth: '0px', borderStyle: 'none', margin: '5px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
            Name:
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
            Email:
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
            Phone:
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
            Location:
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
            New Password:
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
            Delete Account

          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%', height: '50vh', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '5px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', height: '60px', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
            <input className={styles.input}></input>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
            <input className={styles.input}></input>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
            <input className={styles.input}></input>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
            <input className={styles.input}></input>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
            <input className={styles.input}></input>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
            Delete Account

          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
