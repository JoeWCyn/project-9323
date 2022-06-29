import React from 'react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import Box from '@mui/material/Box';
const App = () => {
  return (
<Box sx={{ display: 'flex' }}>
{localStorage.getItem('token')
  ? (
          <LoggedNarbar></LoggedNarbar>
    )
  : (
          <Navbar></Navbar>
    )}
    </Box>
  );
};

export default App;
