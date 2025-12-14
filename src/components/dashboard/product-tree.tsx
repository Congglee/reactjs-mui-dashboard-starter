import TreeItem from '@/components/dashboard/tree-item'
import { mockTreeData } from '@/constants/mock-data'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

export default function ProductTree() {
  const [selectedId, setSelectedId] = useState('home')
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['website']))

  const handleExpandToggle = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev)

      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }

      return newSet
    })
  }

  return (
    <Paper
      elevation={0}
      sx={[
        {
          bgcolor: 'background.default',
          borderRadius: 2,
          p: 2,
          border: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          height: '100%',
          boxShadow: '0 2px 14px rgba(0,0,0,0.06)'
        },
        (theme) =>
          theme.applyStyles('dark', {
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
          })
      ]}
    >
      <Typography
        variant='subtitle1'
        sx={{
          color: 'text.primary',
          fontWeight: 600,
          mb: 1,
          fontSize: '0.875rem'
        }}
      >
        Product tree
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        {mockTreeData.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            selectedId={selectedId}
            onSelect={setSelectedId}
            expandedIds={expandedIds}
            onToggleExpand={handleExpandToggle}
          />
        ))}
      </Box>
    </Paper>
  )
}
