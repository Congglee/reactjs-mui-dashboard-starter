import AuthCard from '@/components/auth/auth-card'
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

export default function Register() {
  const [nameError, setNameError] = useState(false)
  const [nameErrorMessage, setNameErrorMessage] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (nameError || emailError || passwordError) {
      event.preventDefault()
      return
    }

    const data = new FormData(event.currentTarget)

    console.log('Register form submitted:', {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password')
    })
  }

  const validateInputs = () => {
    const name = document.getElementById('name') as HTMLInputElement
    const email = document.getElementById('email') as HTMLInputElement
    const password = document.getElementById('password') as HTMLInputElement

    let isValid = true

    if (!name.value || name.value.trim().length < 2) {
      setNameError(true)
      setNameErrorMessage('Name must be at least 2 characters long.')
      isValid = false
    } else {
      setNameError(false)
      setNameErrorMessage('')
    }

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
        Sign up
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
          <FormLabel htmlFor='name'>Name</FormLabel>
          <TextField
            error={nameError}
            helperText={nameErrorMessage}
            id='name'
            type='text'
            name='name'
            placeholder='Your name'
            autoComplete='name'
            autoFocus
            required
            fullWidth
            variant='outlined'
            color={nameError ? 'error' : 'primary'}
          />
        </FormControl>
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
            autoComplete='new-password'
            required
            fullWidth
            variant='outlined'
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>

        <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />

        <Button type='submit' fullWidth variant='contained' onClick={validateInputs}>
          Sign up
        </Button>
      </Box>

      <Divider>or</Divider>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button fullWidth variant='outlined' onClick={() => alert('Sign up with Google')} startIcon={<GoogleIcon />}>
          Sign up with Google
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <MuiLink component={NavLink} to={path.login} variant='body2' sx={{ fontSize: '1rem', alignSelf: 'center' }}>
            Sign in
          </MuiLink>
        </Typography>
      </Box>
    </AuthCard>
  )
}
