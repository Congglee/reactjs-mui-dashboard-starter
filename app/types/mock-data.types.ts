export interface Trend {
  value: number
  direction: 'up' | 'down'
}

export interface TreeNode {
  id: string
  label: string
  type: 'parent' | 'leaf'
  dotColor?: 'green' | 'blue'
  children?: TreeNode[]
}

export interface CountryData {
  id: string
  country: string
  percentage: number
  color: string
  flag: string
  countryCode?: string
}

export type TaskCategory = 'Documentation' | 'Bug' | 'Feature'

export type TaskStatus = 'Canceled' | 'Done' | 'In Progress' | 'Todo' | 'Backlog'

export type TaskPriority = 'Low' | 'Medium' | 'High'

export interface Task {
  id: string
  title: string
  category: TaskCategory
  status: TaskStatus
  priority: TaskPriority
  description?: string
  assignee?: string
  createdAt?: string
  updatedAt?: string
  dueDate?: string
}
