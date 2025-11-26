import type { TreeNode } from '@/types/mock-data.types'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'

interface TreeItemProps {
  node: TreeNode
  level?: number
  selectedId: string
  onSelect: (id: string) => void
  expandedIds: Set<string>
  onToggleExpand: (id: string) => void
}

export default function TreeItem({
  node,
  level = 0,
  selectedId,
  onSelect,
  expandedIds,
  onToggleExpand
}: TreeItemProps) {
  const theme = useTheme()

  const isExpanded = expandedIds.has(node.id)
  const isSelected = selectedId === node.id
  const hasChildren = node.children && node.children.length > 0
  const isExpandable = node.type === 'parent'

  const handleClick = () => {
    if (isExpandable) {
      onToggleExpand(node.id)
    }
    onSelect(node.id)
  }

  const dotColorMap = { green: theme.palette.success.main, blue: theme.palette.info.main }

  return (
    <>
      <Box
        onClick={handleClick}
        sx={[
          {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 0.75,
            px: 1.5,
            pl: 1.5 + level * 1.5,
            borderRadius: 1,
            cursor: 'pointer',
            bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
            transition: 'background-color 0.15s ease',
            '&:hover': {
              bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.12) : 'var(--color-hover)'
            }
          },
          (theme) =>
            theme.applyStyles('dark', {
              bgcolor: isSelected ? 'var(--color-selected)' : 'transparent',
              '&:hover': {
                bgcolor: isSelected ? 'var(--color-focus)' : 'var(--color-hover)'
              }
            })
        ]}
      >
        {isExpandable ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 16,
              height: 16,
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <ChevronRightIcon sx={{ fontSize: 16, color: 'text.primary' }} />
          </Box>
        ) : null}

        {!isExpandable && node.dotColor ? (
          <FiberManualRecordIcon
            sx={{
              fontSize: 8,
              color: dotColorMap[node.dotColor],
              flexShrink: 0
            }}
          />
        ) : null}

        <Typography
          variant='body2'
          sx={{
            color: 'text.primary',
            fontWeight: isSelected ? 500 : 400,
            fontSize: '0.875rem',
            lineHeight: 1.5,
            userSelect: 'none'
          }}
        >
          {node.label}
        </Typography>
      </Box>

      {isExpandable && hasChildren && (
        <Collapse
          in={isExpanded}
          timeout={{
            enter: 300,
            exit: 250
          }}
          easing={{
            enter: 'cubic-bezier(0.4, 0, 0.2, 1)',
            exit: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          unmountOnExit
        >
          <Box>
            {node.children!.map((child, index) => (
              <Box
                key={child.id}
                sx={{
                  animation: isExpanded ? `fadeInSlide 0.2s ease-out ${index * 0.03}s both` : 'none',
                  '@keyframes fadeInSlide': {
                    from: {
                      opacity: 0,
                      transform: 'translateX(-4px)'
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateX(0)'
                    }
                  }
                }}
              >
                <TreeItem
                  node={child}
                  level={level + 1}
                  selectedId={selectedId}
                  onSelect={onSelect}
                  expandedIds={expandedIds}
                  onToggleExpand={onToggleExpand}
                />
              </Box>
            ))}
          </Box>
        </Collapse>
      )}
    </>
  )
}
