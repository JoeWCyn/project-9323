import React, { useState } from 'react';
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
import { register } from '../../service';
import CommonMessage from '../CommonMessage/CommonMessage'

const Signin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(['', 'error', false]);
  function setMessageStatus () {
    setErrorMessage(['', 'error', false])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name | !email | !password | !confirmPassword) {
      setErrorMessage(['Please fill in all fields', 'error', true]);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage(['Passwords do not match', 'error', true]);
      return;
    }
    try {
      await register({ name, email, password });
      setErrorMessage(['Register in success', 'success', true]);
      window.location.reload(false);
    } catch (error) {
      setErrorMessage([error.response.data.error, 'error', true]);
    }
  };
  return (
  <DialogContent >
    <TextField
    margin="normal"
    required
    fullWidth
    label="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    />
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
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}

          >
            Register
          </Button>
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
  );
}
export default Signin;
