/* eslint-disable multiline-ternary */
import React from 'react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';

const Home = () => {
  console.log(localStorage.getItem('sign-status'));
  return (
    <div className="home">
      {localStorage.getItem('sign-status') ? (
        <LoggedNarbar></LoggedNarbar>
      ) : (
        <Navbar></Navbar>
      )}
      <Box
        sx={{
          backgroundColor: 'rgb(118, 118, 118, 0.1)',
          height: '100vh',
          display: 'flex',
        }}
      >
        <CardContent
          sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '60%',
          }}
        >
          <Box sx={{ width: '50%', backgroundColor: '#FFF' }}>
            <CardHeader
              sx={{
                textAlign: 'center',
              }}
              title={'This is a title'}
            ></CardHeader>
            <CardContent
              sx={{ borderBottom: '1px solid #e6e5e6' }}
              // eslint-disable-next-line react/no-children-prop
              children={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut viverra tellus, sit amet sagittis libero. Integer nibh tortor, facilisis vel mollis dapibus, mattis ut nisl. Praesent convallis consequat eros, at interdum lorem lacinia eget. Praesent posuere leo nec tempor pretium. Quisque imperdiet semper ex, in maximus urna porttitor laoreet. Curabitur hendrerit est eget ante pulvinar tristique. Nullam vulputate, nulla vel posuere ullamcorper, mauris leo molestie tellus, a volutpat orci velit eu justo. Curabitur erat lectus, luctus non mauris ut, ultricies ornare diam. Praesent iaculis sapien nec blandit tempus. Praesent vitae gravida nisi. Donec consequat interdum elementum. Donec nec lacus mi. Fusce posuere cursus augue, sit amet vulputate eros dapibus ac. Nulla consequat massa massa, vel hendrerit nunc mattis ut. Morbi lobortis tristique tincidunt. Nulla facilisi'
              }
            ></CardContent>
          </Box>
        </CardContent>
        <Box
          sx={{
            width: '50%',
            marginLeft: 'auto',
            marginRight: ' auto',
            height: '80vh',
            border: '1px solid red',
            marginTop: ' 2rem',
          }}
        ></Box>
      </Box>
    </div>
  );
};
export default Home;
