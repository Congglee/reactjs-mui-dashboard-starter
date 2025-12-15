import EmailNotificationCard from '@/components/settings/notifications/email-notification-card'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

interface NotificationsFormData {
  notifyAbout: 'all' | 'direct' | 'nothing'
  communicationEmails: boolean
  marketingEmails: boolean
  socialEmails: boolean
  securityEmails: boolean
  useMobileSettings: boolean
}

const initialFormData: NotificationsFormData = {
  notifyAbout: 'all',
  communicationEmails: false,
  marketingEmails: false,
  socialEmails: true,
  securityEmails: true,
  useMobileSettings: false
}

export default function Notifications() {
  const [formData, setFormData] = useState<NotificationsFormData>(initialFormData)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Notifications form submitted:', formData)
  }

  return (
    <Box component='form' onSubmit={onSubmit} sx={{ maxWidth: { xs: '100%', lg: 680 }, width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant='h1'
          sx={{
            fontSize: '1.375rem',
            fontWeight: 600,
            lineHeight: 1.4,
            color: 'text.primary',
            mb: 0.5
          }}
        >
          Notifications
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            lineHeight: 1.5
          }}
        >
          Configure how you receive notifications.
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'var(--color-border)', mb: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'text.primary',
            mb: 1.5
          }}
        >
          Notify me about...
        </Typography>
        <RadioGroup
          value={formData.notifyAbout}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, notifyAbout: e.target.value as 'all' | 'direct' | 'nothing' }))
          }
          sx={{ gap: 0.5 }}
        >
          <FormControlLabel
            value='all'
            control={
              <Radio
                size='small'
                sx={{
                  color: 'var(--color-border-strong)',
                  '&.Mui-checked': {
                    color: 'primary.main'
                  }
                }}
              />
            }
            label='All new messages'
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem',
                color: 'text.primary'
              }
            }}
          />
          <FormControlLabel
            value='direct'
            control={
              <Radio
                size='small'
                sx={{
                  color: 'var(--color-border-strong)',
                  '&.Mui-checked': {
                    color: 'primary.main'
                  }
                }}
              />
            }
            label='Direct messages and mentions'
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem',
                color: 'text.primary'
              }
            }}
          />
          <FormControlLabel
            value='nothing'
            control={
              <Radio
                size='small'
                sx={{
                  color: 'var(--color-border-strong)',
                  '&.Mui-checked': {
                    color: 'primary.main'
                  }
                }}
              />
            }
            label='Nothing'
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem',
                color: 'text.primary'
              }
            }}
          />
        </RadioGroup>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'text.primary',
            mb: 2
          }}
        >
          Email Notifications
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <EmailNotificationCard
            title='Communication emails'
            description='Receive emails about your account activity.'
            checked={formData.communicationEmails}
            onChange={(checked) => setFormData((prev) => ({ ...prev, communicationEmails: checked }))}
          />
          <EmailNotificationCard
            title='Marketing emails'
            description='Receive emails about new products, features, and more.'
            checked={formData.marketingEmails}
            onChange={(checked) => setFormData((prev) => ({ ...prev, marketingEmails: checked }))}
          />
          <EmailNotificationCard
            title='Social emails'
            description='Receive emails for friend requests, follows, and more.'
            checked={formData.socialEmails}
            onChange={(checked) => setFormData((prev) => ({ ...prev, socialEmails: checked }))}
          />
          <EmailNotificationCard
            title='Security emails'
            description='Receive emails about your account activity and security.'
            checked={formData.securityEmails}
            onChange={(checked) => setFormData((prev) => ({ ...prev, securityEmails: checked }))}
          />
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.useMobileSettings}
              onChange={(e) => setFormData((prev) => ({ ...prev, useMobileSettings: e.target.checked }))}
              size='small'
              sx={{
                color: 'var(--color-border-strong)',
                '&.Mui-checked': {
                  color: 'primary.main'
                },
                py: 0
              }}
            />
          }
          label={
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.primary' }}>
              Use different settings for my mobile devices
            </Typography>
          }
        />
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            fontSize: '0.8125rem',
            ml: 3.5
          }}
        >
          You can manage your mobile notifications in the{' '}
          <Link
            href='#'
            sx={{
              color: 'text.secondary',
              textDecorationStyle: 'dashed',
              textUnderlineOffset: 3,
              '&:hover': {
                color: 'text.primary'
              }
            }}
          >
            mobile settings
          </Link>{' '}
          page.
        </Typography>
      </Box>

      <Button
        type='submit'
        variant='contained'
        disableElevation
        sx={[
          {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            borderRadius: 1.5,
            px: 2.5,
            py: 1,
            bgcolor: 'text.primary',
            color: 'background.default',
            '&:hover': {
              bgcolor: 'text.secondary'
            }
          },
          (theme) =>
            theme.applyStyles('dark', {
              bgcolor: '#e8eaed',
              color: '#121621',
              '&:hover': {
                bgcolor: '#d1d5db'
              }
            })
        ]}
      >
        Update notifications
      </Button>
    </Box>
  )
}
