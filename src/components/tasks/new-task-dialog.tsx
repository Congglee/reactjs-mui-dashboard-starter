import { mockAssignees } from '@/constants/mock-data'
import type { Assignee } from '@/types/mock-data.type'
import CloseIcon from '@mui/icons-material/Close'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useState } from 'react'

interface NewTaskDialogProps {
  newTaskDialogOpen: boolean
  onNewTaskDialogClose: () => void
}

export default function NewTaskDialog({ newTaskDialogOpen, onNewTaskDialogClose }: NewTaskDialogProps) {
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee | null>(null)

  return (
    <Drawer
      anchor='right'
      open={newTaskDialogOpen}
      onClose={onNewTaskDialogClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 400 },
            display: 'flex',
            flexDirection: 'column'
          }
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', p: 3, pb: 0 }}>
        <Box>
          <Typography variant='h6' component='h2' sx={{ fontWeight: 600 }}>
            Create Task
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
            Add a new task by providing necessary info. Click save when you're done.
          </Typography>
        </Box>
        <IconButton onClick={onNewTaskDialogClose} size='small'>
          <CloseIcon />
        </IconButton>
      </Box>

      <Stack spacing={3} sx={{ flex: 1, p: 3 }}>
        <Box>
          <FormLabel sx={{ display: 'block', fontWeight: 500, color: 'text.primary' }}>Title</FormLabel>
          <TextField fullWidth placeholder='Enter a title' variant='outlined' size='small' />
        </Box>

        <Box>
          <FormLabel sx={{ display: 'block', fontWeight: 500, color: 'text.primary' }}>Status</FormLabel>
          <Select fullWidth displayEmpty defaultValue='' size='small'>
            <MenuItem value='' disabled>
              Select status
            </MenuItem>
            <MenuItem value='Todo'>Todo</MenuItem>
            <MenuItem value='In Progress'>In Progress</MenuItem>
            <MenuItem value='Done'>Done</MenuItem>
            <MenuItem value='Canceled'>Canceled</MenuItem>
            <MenuItem value='Backlog'>Backlog</MenuItem>
          </Select>
        </Box>

        <Box>
          <FormLabel sx={{ display: 'block', fontWeight: 500, color: 'text.primary' }}>Label</FormLabel>
          <FormControl>
            <RadioGroup defaultValue='Documentation'>
              <FormControlLabel value='Documentation' control={<Radio />} label='Documentation' />
              <FormControlLabel value='Feature' control={<Radio />} label='Feature' />
              <FormControlLabel value='Bug' control={<Radio />} label='Bug' />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box>
          <FormLabel sx={{ display: 'block', fontWeight: 500, color: 'text.primary' }}>Priority</FormLabel>
          <FormControl>
            <RadioGroup defaultValue='High'>
              <FormControlLabel value='High' control={<Radio />} label='High' />
              <FormControlLabel value='Medium' control={<Radio />} label='Medium' />
              <FormControlLabel value='Low' control={<Radio />} label='Low' />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box>
          <FormLabel sx={{ display: 'block', fontWeight: 500, color: 'text.primary' }}>Assignee</FormLabel>
          <Autocomplete
            options={mockAssignees}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={selectedAssignee}
            onChange={(_event, newValue) => {
              setSelectedAssignee(newValue)
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder='Select assignee' variant='outlined' size='small' />
            )}
            fullWidth
          />
        </Box>

        <Box>
          <FormLabel sx={{ display: 'block', fontWeight: 500, color: 'text.primary' }}>Due Date</FormLabel>
          <DatePicker slotProps={{ textField: { size: 'small', fullWidth: true } }} defaultValue={dayjs()} />
        </Box>

        <Box>
          <FormLabel sx={{ display: 'block', fontWeight: 500, color: 'text.primary' }}>Description</FormLabel>
          <TextField
            fullWidth
            placeholder='Enter task description'
            multiline
            rows={4}
            variant='outlined'
            size='small'
          />
        </Box>
      </Stack>

      <Stack spacing={2} sx={{ p: 3, pt: 0 }}>
        <Button
          variant='outlined'
          fullWidth
          onClick={onNewTaskDialogClose}
          sx={{ color: 'text.primary', borderColor: 'divider' }}
        >
          Close
        </Button>
        <Button variant='contained' fullWidth type='submit'>
          Save changes
        </Button>
      </Stack>
    </Drawer>
  )
}
