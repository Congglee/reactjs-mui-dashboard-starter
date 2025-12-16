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

interface TaskFormData {
  title: string
  status: TaskStatus | ''
  label: TaskCategory
  priority: TaskPriority
  assignee: Assignee | null
  dueDate: dayjs.Dayjs | null
  description: string
}

const initialFormData: TaskFormData = {
  title: '',
  status: '',
  label: 'Documentation',
  priority: 'High',
  assignee: null,
  dueDate: null,
  description: ''
}

interface EditTaskDrawerProps {
  editTaskDrawerOpen: boolean
  onEditTaskDrawerClose: () => void
  task: Task | null
}

export default function EditTaskDrawer({ editTaskDrawerOpen, onEditTaskDrawerClose, task }: EditTaskDrawerProps) {
  const [formData, setFormData] = useState<TaskFormData>(initialFormData)

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        status: task.status,
        label: task.category,
        priority: task.priority,
        assignee: mockAssignees.find((a) => a.id === task.assignee) || null,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null,
        description: task.description || ''
      })
    } else {
      setFormData(initialFormData)
    }
  }, [task, editTaskDrawerOpen])

  return (
    <Drawer
      anchor='right'
      open={editTaskDrawerOpen}
      onClose={onEditTaskDrawerClose}
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
        <IconButton onClick={onEditTaskDrawerClose} size='small'>
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
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          />
        </Box>

        <Box>
          <FormLabel sx={{ display: 'block', fontWeight: 500, color: 'text.primary' }}>Status</FormLabel>
          <Select
            fullWidth
            displayEmpty
            size='small'
            value={formData.status}
            onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as TaskStatus }))}
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
            <RadioGroup
              value={formData.label}
              onChange={(e) => setFormData((prev) => ({ ...prev, label: e.target.value as TaskCategory }))}
            >
              <FormControlLabel value='Documentation' control={<Radio />} label='Documentation' />
              <FormControlLabel value='Feature' control={<Radio />} label='Feature' />
              <FormControlLabel value='Bug' control={<Radio />} label='Bug' />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box>
          <FormLabel sx={{ display: 'block', fontWeight: 500, color: 'text.primary' }}>Priority</FormLabel>
          <FormControl>
            <RadioGroup
              value={formData.priority}
              onChange={(e) => setFormData((prev) => ({ ...prev, priority: e.target.value as TaskPriority }))}
            >
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
            value={formData.assignee}
            onChange={(_event, newValue) => {
              setFormData((prev) => ({ ...prev, assignee: newValue }))
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
            value={formData.dueDate}
            onChange={(newValue) => setFormData((prev) => ({ ...prev, dueDate: newValue }))}
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
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          />
        </Box>
      </Stack>

      <Stack spacing={2} sx={{ p: 3, pt: 0 }}>
        <Button
          variant='outlined'
          fullWidth
          onClick={onEditTaskDrawerClose}
          sx={{ color: 'text.primary', borderColor: 'divider', textTransform: 'none' }}
        >
          Close
        </Button>
        <Button variant='contained' fullWidth type='submit' sx={{ textTransform: 'none' }}>
          Save changes
        </Button>
      </Stack>
    </Drawer>
  )
}
