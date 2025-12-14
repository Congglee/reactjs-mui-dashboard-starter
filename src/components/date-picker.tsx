import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Button from '@mui/material/Button'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { type Dayjs } from 'dayjs'
import { useCallback, useState } from 'react'

export default function DatePicker() {
  const [value, setValue] = useState<Dayjs | null>(dayjs())
  const [open, setOpen] = useState(false)

  const [anchorDatePickerEl, setAnchorDatePickerEl] = useState<HTMLButtonElement | null>(null)

  const handleDatePickerButtonRef = useCallback((node: HTMLButtonElement | null) => {
    setAnchorDatePickerEl((prev) => (prev === node ? prev : node))
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button
        ref={handleDatePickerButtonRef}
        variant='outlined'
        size='small'
        onClick={() => setOpen(true)}
        startIcon={<CalendarMonthIcon sx={{ fontSize: 18 }} />}
        sx={[
          {
            px: 1.25,
            height: 36,
            minHeight: 36,
            textTransform: 'none',
            borderRadius: 1.25,
            borderColor: 'var(--color-border)',
            color: 'text.primary',
            bgcolor: 'transparent',
            '&:hover': {
              borderColor: 'divider',
              bgcolor: 'rgba(0,0,0,0.04)'
            }
          },
          (theme) =>
            theme.applyStyles('dark', {
              bgcolor: 'rgba(255,255,255,0.05)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.08)'
              }
            })
        ]}
      >
        {value ? value.format('MMM DD, YYYY') : 'Select date'}
      </Button>

      <MuiDatePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          popper: {
            anchorEl: anchorDatePickerEl,
            sx: {
              '& .MuiPaper-root': {
                borderRadius: 2,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
                mt: 0.25,
                pb: 0
              }
            }
          },
          desktopPaper: {
            sx: [
              {
                bgcolor: 'background.paper',
                pb: 1.5,
                '& .MuiPickersCalendarHeader-root': {
                  paddingLeft: 2,
                  paddingRight: 1,
                  paddingTop: 1.5,
                  paddingBottom: 1
                },
                '& .MuiPickersCalendarHeader-label': {
                  fontSize: '0.9375rem',
                  fontWeight: 500
                },
                '& .MuiPickersArrowSwitcher-button': {
                  color: 'text.secondary'
                },
                '& .MuiDayCalendar-header': {
                  paddingLeft: 2,
                  paddingRight: 2
                },
                '& .MuiDayCalendar-weekDayLabel': {
                  color: 'text.secondary',
                  fontSize: '0.8125rem',
                  fontWeight: 500
                },
                '& .MuiPickersDay-root': {
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'var(--color-hover)'
                  },
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: '#fff',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: 'primary.dark'
                    },
                    '&:focus': {
                      bgcolor: 'primary.main'
                    }
                  },
                  '&.MuiPickersDay-today:not(.Mui-selected)': {
                    borderColor: 'primary.main',
                    borderWidth: 1
                  }
                },
                '& .MuiDayCalendar-weekContainer': {
                  paddingLeft: 2,
                  paddingRight: 2
                },
                '& .MuiDayCalendar-monthContainer': {
                  pb: 0
                }
              },
              (theme) =>
                theme.applyStyles('dark', {
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)',
                  '& .MuiPickersDay-root': {
                    '&:hover': {
                      bgcolor: 'var(--color-hover)'
                    },
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.light'
                      }
                    }
                  }
                })
            ]
          }
        }}
        slots={{ field: () => null }}
      />
    </LocalizationProvider>
  )
}
