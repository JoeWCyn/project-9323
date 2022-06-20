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
import { register } from '../../service';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name | !email | !password | !confirmPassword) {
      // TODO: show error
      alert('Please fill out all fields');
      return;
    }
    if (password !== confirmPassword) {
      // TODO: show error
      alert('Password do not match');
      return;
    }
    try {
      const response = await register({ name, email, password });
      // TODO: set AUTH token
      navigate('/');
      console.log(response);
    } catch (error) {
      // TODO: show error
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
        Register
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
        >
          Register
        </Button>
        <Link to="/signin" component={RouterLink}>
          {'Already have an account? Sign in here'}
        </Link>
      </Container>
    </Box>
  );
};

export default Register;
