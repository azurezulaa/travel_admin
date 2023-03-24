import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { AuthContext } from '../../../context/authContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('urnaa@gmail.com');
  const [password, setPassword] = useState('urnaa');
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      const result = await axios.post('http://localhost:8000/users/login', { email, password });
      console.log(result.data);
      setUser(result.data.user);
      setToken(result.data.token);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Имэйл" value={email} />

        <TextField
          name="password"
          label="Нууц үг"
          type={showPassword ? 'text' : 'password'}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Нэвтрэх
      </LoadingButton>
    </>
  );
}
