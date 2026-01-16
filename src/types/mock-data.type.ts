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

export type UserStatus = 'Active' | 'Inactive' | 'Invited' | 'Suspended'

export type UserRole = 'Admin' | 'Manager' | 'Cashier' | 'Superadmin'

export interface User {
  id: string
  username: string
  name: string
  firstName?: string
  lastName?: string
  email: string
  phoneNumber: string
  status: UserStatus
  role: UserRole
  avatar?: string
  createdAt?: string
  updatedAt?: string
  lastLogin?: string
}

export interface Assignee {
  id: string
  name: string
  email: string
  avatar?: string
}

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

export interface TrafficDataPoint {
  day: string
  clicks: number
  visitors: number
}

export interface AnalyticsMetric {
  id: string
  label: string
  value: string | number
  trend: {
    value: string
    direction: 'up' | 'down' | 'neutral'
    isPositive: boolean
  }
  icon: 'chart' | 'users' | 'bounce' | 'clock'
}

export interface ReferrerData {
  id: string
  source: string
  visits: number
  color: string
}

export interface DeviceData {
  id: string
  device: string
  percentage: number
  color: string
}

export interface AnalyticsOverview {
  title: string
  subtitle: string
  data: TrafficDataPoint[]
}
