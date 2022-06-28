import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { signIn } from '../../service.js';
import CommonMessage from '../CommonMessage/CommonMessage'
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(['', 'error', false]);
  function setMessageStatus () {
    setErrorMessage(['', 'error', false])
  }
  /*   const navigate = useNavigate();
 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email | !password) {
      // TODO: show error
      setErrorMessage(['Please fill in all fields', 'error', true]);
      return;
    }
    try {
      const response = await signIn({ email, password });
      // TODO: set AUTH token
      setErrorMessage(['Login in success', 'success', true]);
      console.log(response);
    } catch (error) {
      setErrorMessage([error.response.data.error, 'error', true]);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <Container
        component="form"
        onSubmit={handleSubmit}
        noValidate
        maxWidth="sm"
        sx={{
          mt: 1,
          typography: 'body1',
        }}
      >
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        {<CommonMessage
          setVisible={setMessageStatus}
          message={errorMessage[0]}
          severity={errorMessage[1]}
          visible={errorMessage[2]}
        ></CommonMessage>}
        <Link to="/register" component={RouterLink}>
          {"Don't have an account? Register here"}
        </Link>
      </Container>
    </Box>
  );
};

export default SignIn;
