import AuthCard from '@/components/auth/auth-card'
import ForgotPassword from '@/components/auth/forgot-password'
import Logo from '@/components/logo'
import path from '@/constants/path'
import GoogleIcon from '@mui/icons-material/Google'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import MuiLink from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { NavLink } from 'react-router'

export default function Login() {
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault()
      return
    }
    const data = new FormData(event.currentTarget)
    console.log('Login form submitted:', { email: data.get('email'), password: data.get('password') })
  }

  const handleValidateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement
    const password = document.getElementById('password') as HTMLInputElement

    let isValid = true

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true)
      setEmailErrorMessage('Please enter a valid email address.')
      isValid = false
    } else {
      setEmailError(false)
      setEmailErrorMessage('')
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true)
      setPasswordErrorMessage('Password must be at least 6 characters long.')
      isValid = false
    } else {
      setPasswordError(false)
      setPasswordErrorMessage('')
    }

    return isValid
  }

  return (
    <AuthCard variant='outlined'>
      <Logo />

      <Typography component='h1' variant='h4' sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
        Sign in
      </Typography>

      <Box
        component='form'
        onSubmit={onSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2
        }}
      >
        <FormControl>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id='email'
            type='email'
            name='email'
            placeholder='your@email.com'
            autoComplete='email'
            autoFocus
            required
            fullWidth
            variant='outlined'
            color={emailError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name='password'
            placeholder='••••••'
            type='password'
            id='password'
            autoComplete='current-password'
            autoFocus
            required
            fullWidth
            variant='outlined'
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>

        <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />

        <Button type='submit' fullWidth variant='contained' onClick={handleValidateInputs}>
          Sign in
        </Button>

        <ForgotPassword />
      </Box>

      <Divider>or</Divider>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button fullWidth variant='outlined' onClick={() => alert('Sign in with Google')} startIcon={<GoogleIcon />}>
          Sign in with Google
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <MuiLink
            component={NavLink}
            to={path.register}
            variant='body2'
            sx={{ fontSize: '1rem', alignSelf: 'center' }}
          >
            Sign up
          </MuiLink>
        </Typography>
      </Box>
    </AuthCard>
  )
}
