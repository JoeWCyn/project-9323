import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signIn } from '../../service.js';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email | !password) {
      // TODO: show error
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await signIn({ email, password });
      // TODO: set AUTH token
      navigate('/');
      console.log(response);
    } catch (error) {
      alert(error.response.data.error);
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
        <Link to="/register" component={RouterLink}>
          {"Don't have an account? Register here"}
        </Link>
      </Container>
    </Box>
  );
};

export default SignIn;
