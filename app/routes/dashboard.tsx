import type { Route } from './+types/dashboard'
import DashboardContent from '@/components/dashboard/dashboard-content'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Dashboard' }]
}

export default function Dashboard() {
  return <DashboardContent />
}
