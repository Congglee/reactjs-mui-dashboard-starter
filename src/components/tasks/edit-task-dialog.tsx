import { mockAssignees } from '@/constants/mock-data'
import type { Assignee, Task, TaskCategory, TaskPriority, TaskStatus } from '@/types/mock-data.type'
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
import { useEffect, useState } from 'react'

interface EditTaskDialogProps {
  editTaskDialogOpen: boolean
  onEditTaskDialogClose: () => void
  task: Task | null
}

export default function EditTaskDialog({ editTaskDialogOpen, onEditTaskDialogClose, task }: EditTaskDialogProps) {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<TaskStatus | ''>('')
  const [label, setLabel] = useState<TaskCategory>('Documentation')
  const [priority, setPriority] = useState<TaskPriority>('High')
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee | null>(null)
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(null)
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setStatus(task.status)
      setLabel(task.category)
      setPriority(task.priority)
      setDescription(task.description || '')
      setDueDate(task.dueDate ? dayjs(task.dueDate) : null)
      const assignee = mockAssignees.find((a) => a.id === task.assignee) || null
      setSelectedAssignee(assignee)
    }
  }, [task])

  return (
    <Drawer
      anchor='right'
      open={editTaskDialogOpen}
      onClose={onEditTaskDialogClose}
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
            Edit Task
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
            Modify the task details below. Click save when you're done.
          </Typography>
        </Box>
        <IconButton onClick={onEditTaskDialogClose} size='small'>
          <CloseIcon />
        </IconButton>
      </Box>

      <Stack spacing={3} sx={{ flex: 1, p: 3 }}>
        <Box>
          <FormLabel sx={{ display: 'block', fontWeight: 500, color: 'text.primary' }}>Title</FormLabel>
          <TextField
            fullWidth
            placeholder='Enter a title'
            variant='outlined'
            size='small'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>

        <Box>
          <FormLabel sx={{ display: 'block', fontWeight: 500, color: 'text.primary' }}>Status</FormLabel>
          <Select
            fullWidth
            displayEmpty
            size='small'
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
          >
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
            <RadioGroup value={label} onChange={(e) => setLabel(e.target.value as TaskCategory)}>
              <FormControlLabel value='Documentation' control={<Radio />} label='Documentation' />
              <FormControlLabel value='Feature' control={<Radio />} label='Feature' />
              <FormControlLabel value='Bug' control={<Radio />} label='Bug' />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box>
          <FormLabel sx={{ display: 'block', fontWeight: 500, color: 'text.primary' }}>Priority</FormLabel>
          <FormControl>
            <RadioGroup value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
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
          <DatePicker
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
            value={dueDate}
            onChange={(newValue) => setDueDate(newValue)}
          />
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
      </Stack>

      <Stack spacing={2} sx={{ p: 3, pt: 0 }}>
        <Button
          variant='outlined'
          fullWidth
          onClick={onEditTaskDialogClose}
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
