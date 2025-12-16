import DeleteUserDialog from '@/components/users/delete-user-dialog'
import EditUserDialog from '@/components/users/edit-user-dialog'
import UsersTableSkeleton from '@/components/users/users-table-skeleton'
import { mockUsers } from '@/constants/mock-data'
import type { User, UserRole, UserStatus } from '@/types/mock-data.type'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PersonIcon from '@mui/icons-material/Person'
import SecurityIcon from '@mui/icons-material/Security'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DataGrid, gridClasses, type GridColDef, type GridFilterModel, type GridSortModel } from '@mui/x-data-grid'
import { useEffect, useMemo, useState } from 'react'

export default function UsersTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<Record<string, boolean>>({})
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] })
  const [sortModel, setSortModel] = useState<GridSortModel>([])
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

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

  const handleEditUserDialogOpen = (user: User) => {
    setSelectedUser(user)
    setEditUserDialogOpen(true)
  }

  const handleEditUserDialogClose = () => {
    setEditUserDialogOpen(false)
    setSelectedUser(null)
  }

  const handleDeleteUserDialogOpen = (user: User) => {
    setUserToDelete(user)
    setDeleteUserDialogOpen(true)
  }

  const handleDeleteUserDialogClose = () => {
    setDeleteUserDialogOpen(false)
    setUserToDelete(null)
  }

  const handleDeleteUserConfirm = () => {
    console.log('Deleting user:', userToDelete?.id)
    handleDeleteUserDialogClose()
  }

  const rows = mockUsers

  const headerLabel = (text: string) => (
    <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }} noWrap>
      {text}
    </Typography>
  )

  const getStatusChipProps = (status: UserStatus) => {
    switch (status) {
      case 'Active':
        return {
          label: 'Active',
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
      case 'Inactive':
        return {
          label: 'Inactive',
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
      case 'Invited':
        return {
          label: 'Invited',
          sx: {
            height: 24,
            fontSize: '0.75rem',
            borderRadius: 999,
            px: 0.75,
            bgcolor: 'var(--color-info-bg)',
            color: 'var(--color-info)',
            border: '1px solid var(--color-info-border)'
          }
        }
      case 'Suspended':
        return {
          label: 'Suspended',
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
      default:
        return {
          label: status,
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

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'Superadmin':
        return <SecurityIcon fontSize='small' sx={{ color: 'error.main', mr: 0.5 }} />
      case 'Admin':
        return <AdminPanelSettingsIcon fontSize='small' sx={{ color: 'warning.main', mr: 0.5 }} />
      case 'Manager':
        return <ManageAccountsIcon fontSize='small' sx={{ color: 'info.main', mr: 0.5 }} />
      case 'Cashier':
        return <PersonIcon fontSize='small' sx={{ color: 'text.secondary', mr: 0.5 }} />
      default:
        return <PersonIcon fontSize='small' sx={{ color: 'text.secondary', mr: 0.5 }} />
    }
  }

  const columns: GridColDef<User>[] = useMemo(
    () => [
      {
        field: 'username',
        headerName: 'Username',
        width: 180,
        renderHeader: () => headerLabel('Username'),
        renderCell: (params) => (
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {params.value}
          </Typography>
        )
      },
      {
        field: 'name',
        headerName: 'Name',
        width: 180,
        renderHeader: () => headerLabel('Name'),
        renderCell: (params) => (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {params.value}
          </Typography>
        )
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        minWidth: 220,
        renderHeader: () => headerLabel('Email'),
        renderCell: (params) => (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {params.value}
          </Typography>
        )
      },
      {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        width: 160,
        renderHeader: () => headerLabel('Phone Number'),
        renderCell: (params) => (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {params.value}
          </Typography>
        )
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        type: 'singleSelect',
        valueOptions: ['Active', 'Inactive', 'Invited', 'Suspended'],
        renderHeader: () => headerLabel('Status'),
        renderCell: (params) => {
          const chipProps = getStatusChipProps(params.value)
          return <Chip {...chipProps} size='small' />
        }
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 140,
        type: 'singleSelect',
        valueOptions: ['Superadmin', 'Admin', 'Manager', 'Cashier'],
        renderHeader: () => headerLabel('Role'),
        renderCell: (params) => (
          <Stack direction='row' alignItems='center'>
            {getRoleIcon(params.value)}
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {params.value}
            </Typography>
          </Stack>
        )
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
        renderCell: (params) => (
          <Stack direction='row' spacing={0} justifyContent='flex-end' width='100%'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => handleEditUserDialogOpen(params.row)}
            >
              <EditIcon fontSize='small' />
            </IconButton>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => handleDeleteUserDialogOpen(params.row)}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </Stack>
        )
      }
    ],
    []
  )

  if (isLoading) {
    return <UsersTableSkeleton />
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

      <EditUserDialog
        editUserDialogOpen={editUserDialogOpen}
        onEditUserDialogClose={handleEditUserDialogClose}
        user={selectedUser}
      />

      <DeleteUserDialog
        deleteUserDialogOpen={deleteUserDialogOpen}
        onDeleteUserDialogClose={handleDeleteUserDialogClose}
        onDeleteUserConfirm={handleDeleteUserConfirm}
        user={userToDelete}
      />
    </Box>
  )
}
