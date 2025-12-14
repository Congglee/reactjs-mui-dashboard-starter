import TasksTableSkeleton from '@/components/tasks/tasks-table-skeleton'
import { mockTasks } from '@/constants/mock-data'
import type { Task, TaskPriority } from '@/types/mock-data.type'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DataGrid, gridClasses, type GridColDef, type GridFilterModel, type GridSortModel } from '@mui/x-data-grid'
import { useEffect, useMemo, useState } from 'react'

export default function TasksTable() {
  const [isLoading, setIsLoading] = useState(true)

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<Record<string, boolean>>({})
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] })
  const [sortModel, setSortModel] = useState<GridSortModel>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const handleColumnVisibilityChange = (newModel: Record<string, boolean>) => {
    setColumnVisibilityModel(newModel)
  }

  const handleFilterModelChange = (newModel: GridFilterModel) => {
    setFilterModel(newModel)
  }

  const handleSortModelChange = (newModel: GridSortModel) => {
    setSortModel(newModel)
  }

  const rows = mockTasks

  const headerLabel = (text: string) => (
    <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }} noWrap>
      {text}
    </Typography>
  )

  const getPriorityChipProps = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return {
          label: 'High',
          sx: {
            height: 24,
            fontSize: '0.75rem',
            borderRadius: 999,
            px: 0.75,
            bgcolor: 'var(--color-error-bg)',
            color: 'var(--color-error)',
            border: '1px solid var(--color-error-border)'
          }
        }
      case 'Medium':
        return {
          label: 'Medium',
          sx: {
            height: 24,
            fontSize: '0.75rem',
            borderRadius: 999,
            px: 0.75,
            bgcolor: 'var(--color-warning-bg)',
            color: 'var(--color-warning)',
            border: '1px solid var(--color-warning-border)'
          }
        }
      case 'Low':
        return {
          label: 'Low',
          sx: {
            height: 24,
            fontSize: '0.75rem',
            borderRadius: 999,
            px: 0.75,
            bgcolor: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            border: '1px solid var(--color-success-border)'
          }
        }
      default:
        return {
          label: priority,
          sx: {
            height: 24,
            fontSize: '0.75rem',
            borderRadius: 999,
            px: 0.75,
            bgcolor: 'var(--color-flag-bg)',
            color: 'text.secondary',
            border: '1px solid var(--color-flag-border)'
          }
        }
    }
  }

  const columns: GridColDef<Task>[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        width: 120,
        renderHeader: () => headerLabel('ID'),
        renderCell: (params) => (
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {params.value?.replace('TASK-', '')}
          </Typography>
        )
      },
      {
        field: 'title',
        headerName: 'Title',
        flex: 1,
        minWidth: 250,
        renderHeader: () => headerLabel('Title'),
        renderCell: (params) => (
          <Typography variant='body2' noWrap sx={{ fontWeight: 500 }}>
            {params.value}
          </Typography>
        )
      },
      {
        field: 'priority',
        headerName: 'Priority',
        width: 120,
        type: 'singleSelect',
        valueOptions: ['High', 'Medium', 'Low'],
        renderHeader: () => headerLabel('Priority'),
        renderCell: (params) => {
          const chipProps = getPriorityChipProps(params.value)
          return <Chip {...chipProps} size='small' />
        }
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 150,
        type: 'date',
        valueGetter: (value) => (value ? new Date(value) : null),
        renderHeader: () => headerLabel('Created At'),
        renderCell: (params) => (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {params.value ? new Date(params.value).toLocaleDateString('en-GB') : '-'}
          </Typography>
        )
      },
      {
        field: 'category',
        headerName: 'Category',
        width: 150,
        type: 'singleSelect',
        valueOptions: ['Feature', 'Bug', 'Documentation', 'Enhancement', 'Refactoring'],
        renderHeader: () => headerLabel('Category'),
        renderCell: (params) => (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {params.value}
          </Typography>
        )
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 100,
        type: 'singleSelect',
        valueOptions: ['Done', 'Canceled', 'In Progress', 'Backlog', 'Todo'],
        align: 'center',
        headerAlign: 'center',
        renderHeader: () => headerLabel('Status'),
        renderCell: (params) => {
          const isDone = params.value === 'Done'
          const isCanceled = params.value === 'Canceled'

          if (isDone) return <CheckIcon fontSize='small' sx={{ color: 'text.secondary' }} />
          if (isCanceled) return <CloseIcon fontSize='small' sx={{ color: 'text.secondary' }} />
          return <MoreHorizIcon fontSize='small' sx={{ color: 'text.secondary' }} />
        }
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        align: 'right',
        headerAlign: 'right',
        renderHeader: () => <Box />,
        renderCell: () => (
          <Stack direction='row' spacing={0} justifyContent='flex-end' width='100%'>
            <IconButton size='small' sx={{ color: 'text.secondary' }}>
              <EditIcon fontSize='small' />
            </IconButton>
            <IconButton size='small' sx={{ color: 'text.secondary' }}>
              <DeleteIcon fontSize='small' />
            </IconButton>
          </Stack>
        )
      }
    ],
    []
  )

  if (isLoading) {
    return <TasksTableSkeleton />
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
        density='standard'
        rowHeight={52}
        columnHeaderHeight={52}
        pageSizeOptions={[10, 25, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
        showToolbar
        filterModel={filterModel}
        onFilterModelChange={(newModel) => handleFilterModelChange(newModel)}
        sortModel={sortModel}
        onSortModelChange={(newModel) => handleSortModelChange(newModel)}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => handleColumnVisibilityChange(newModel)}
        slotProps={{
          loadingOverlay: {
            variant: 'circular-progress',
            noRowsVariant: 'circular-progress'
          },
          baseIconButton: {
            size: 'small'
          }
        }}
        sx={{
          border: 'none',
          '--DataGrid-containerBackground': 'transparent',
          '& .MuiDataGrid-cellCheckbox': { alignItems: 'center' },
          [`& .${gridClasses.main}`]: {
            borderTop: '1px solid var(--color-border)'
          },
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: 'transparent',
            color: 'text.secondary',
            fontSize: '0.875rem'
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600
          },
          '& .MuiDataGrid-cell': {
            borderColor: 'var(--color-border)',
            color: 'text.primary',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            py: 0
          },
          '& .MuiDataGrid-row:hover': {
            bgcolor: 'var(--color-hover)'
          },
          '& .MuiDataGrid-row.Mui-selected': {
            bgcolor: 'var(--color-selected)',
            '&:hover': {
              bgcolor: 'var(--color-focus)'
            }
          },
          '& .MuiDataGrid-selectedRowCount': {
            color: 'text.secondary'
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid var(--color-border)',
            color: 'text.secondary',
            px: 1,
            bgcolor: 'transparent'
          },
          '& .MuiTablePagination-displayedRows, & .MuiTablePagination-selectLabel': {
            color: 'text.secondary'
          },
          '& .MuiDataGrid-columnSeparator': { display: 'none' },
          // Toolbar styling
          [`& .${gridClasses.toolbarContainer}`]: {
            p: 1.5
          },
          [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
            outline: 'transparent'
          },
          [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]: {
            outline: 'none'
          }
        }}
      />
    </Box>
  )
}
