import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import MuiLink from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

export default function ForgotPassword() {
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true)
  }

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false)
    setEmailError(false)
    setEmailErrorMessage('')
  }

  const handleValidateInputs = () => {
    const email = document.getElementById('reset-email') as HTMLInputElement

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true)
      setEmailErrorMessage('Please enter a valid email address.')
      return false
    }

    setEmailError(false)
    setEmailErrorMessage('')
    return true
  }

  const onSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    if (!handleValidateInputs()) {
      return
    }

    const form = event.currentTarget as HTMLFormElement
    const data = new FormData(form)
    console.log('Forgot password form submitted:', { email: data.get('email') })
    handleForgotPasswordClose()
  }

  return (
    <>
      <MuiLink
        component='button'
        type='button'
        onClick={handleForgotPasswordOpen}
        variant='body2'
        sx={{
          alignSelf: 'center',
          '&:hover': { textDecoration: 'underline' }
        }}
      >
        Forgot your password?
      </MuiLink>

      <Dialog
        open={forgotPasswordOpen}
        onClose={handleForgotPasswordClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit,
            sx: { backgroundImage: 'none' }
          }
        }}
      >
        <DialogTitle>Reset password</DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <DialogContentText>
            Enter your account&apos;s email address, and we&apos;ll send you a link to reset your password.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='reset-email'
            name='email'
            label='Email address'
            placeholder='Email address'
            type='email'
            fullWidth
            variant='outlined'
            error={emailError}
            helperText={emailErrorMessage}
            color={emailError ? 'error' : 'primary'}
          />
        </DialogContent>

        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleForgotPasswordClose}>Cancel</Button>
          <Button variant='contained' type='submit'>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
