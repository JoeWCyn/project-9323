import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
// import CloseIcon from '@mui/icons-material/Close';
// import IconButton from '@mui/material/IconButton';
import { signIn } from '../../service';
import CommonMessage from '../CommonMessage/CommonMessage'
const Signin = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState(['', 'error', false]);
  function setMessageStatus () {
    setErrorMessage(['', 'error', false])
  }
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const [focus, setFocus] = React.useState(true);

  // const focus = true
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email | !password) {
      setErrorMessage(['Please fill in all fields', 'error', true]);
      return;
    }
    setLoading(true)
    try {
      const response = await signIn({ email, password });

      localStorage.setItem('token', response.data.token);
      setErrorMessage(['Login in success', 'success', true]);
      window.location.reload(false);
    } catch (error) {
      setErrorMessage([error.response.data.error, 'error', true]);
      setLoading(false)
    }
  };
  return (
  // <div className='login'>
  //  <button id='loginbutton' onClick={handleClickOpen}>Sign In / Register</button>
  //   <Dialog open={open} onClose={handleClose}>
  //     <div style={{ display: 'flex' }}>
  //       <DialogTitle>Come on in</DialogTitle>
  //       <IconButton id='close' aria-label="close" size="large" onClick={handleClose}>
  //         <CloseIcon />
  //       </IconButton>
  //     </div>
  //     <div className='select'>
  //       <button autoFocus={true}>SIGN IN</button>
  //       <button>I AM NEW HERE</button>
  //     </div>

    <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoadingButton
                    loading={loading}
                    loadingIndicator="Loading..."
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </LoadingButton>
          {<CommonMessage
          setVisible={setMessageStatus}
          message={errorMessage[0]}
          severity={errorMessage[1]}
          visible={errorMessage[2]}
        ></CommonMessage>}
          <h2 style={ {
            textAlign: 'center',
            alignItems: 'center'
          }}>OR</h2>
          <Button
          fullWidth
          type='google'
          startIcon={<GoogleIcon />}
          size='large'>Continue With Google </Button>
          <Button
          fullWidth
          type='facebook'
          startIcon={<FacebookIcon />}
          size='large'>Continue With Facebook</Button>
        </DialogContent>
  //   </Dialog>
  // </div>
  );
}
export default Signin;
