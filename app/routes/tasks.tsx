import TasksHeader from '@/components/tasks/tasks-header'
import TasksTable from '@/components/tasks/tasks-table'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useCallback, useEffect, useState } from 'react'
import type { Route } from './+types/tasks'
import type { GridFilterModel, GridSortModel } from '@mui/x-data-grid'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Tasks' }]
}

export default function Tasks() {
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

  const handleColumnVisibilityChange = useCallback((newModel: Record<string, boolean>) => {
    setColumnVisibilityModel(newModel)
  }, [])

  const handleFilterModelChange = useCallback((newModel: GridFilterModel) => {
    setFilterModel(newModel)
  }, [])

  const handleSortModelChange = useCallback((newModel: GridSortModel) => {
    setSortModel(newModel)
  }, [])

  return (
    <Box>
      <TasksHeader />
      <Paper
        sx={[
          {
            width: '100%',
            overflow: 'hidden',
            bgcolor: 'background.paper',
            border: '1px solid var(--color-border)',
            borderRadius: 1
          },
          (theme) =>
            theme.applyStyles('dark', {
              bgcolor: 'background.paper'
            })
        ]}
      >
        <TasksTable
          loading={isLoading}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={handleColumnVisibilityChange}
          filterModel={filterModel}
          onFilterModelChange={handleFilterModelChange}
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
        />
      </Paper>
    </Box>
  )
}
