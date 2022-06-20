import * as React from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import GoogleIcon from '@mui/icons-material/Google';
// import FacebookIcon from '@mui/icons-material/Facebook';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import styles from './App.module.css';

// import { DialogContent } from '@mui/material';
import Signin from './Signin';
import Register from './Register'

const Window = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const [signin, setSignin] = React.useState(false);

  const handleSignin = (e) => {
    e.preventDefault();
    setSignin(!signin);
  }

  return (
  <div className={styles.login}>
    <Button variant='standard' className={`${styles.loginbutton} `} onClick={handleClickOpen} sx={{ fontSize: '18px' }}>Sign In / Register</Button>
    <Dialog open={open} onClose={handleClose}>
      <div style={{ display: 'flex' }}>
        <DialogTitle>Come on in</DialogTitle>
        <IconButton className={`${styles.close} `} sx={{ marginLeft: '65%' }} aria-label="close" size="large" onClick={handleClose}>

          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles.select}>
        <button className={`${styles.button} ${signin ? styles.focusButton : ''}`} autoFocus={true} onClick={handleSignin}>SIGN IN</button>
        <button className={`${styles.button} ${signin ? '' : styles.focusButton}`} onClick={handleSignin}>I AM NEW HERE</button>
      </div>
      <div>
            {signin === true ? (<Register signin={handleSignin}/>) : <Signin signin={handleSignin}/>}
      </div>
    </Dialog>
  </div>
  );
}
export default Window;
