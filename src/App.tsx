import DashboardLayout from '@/components/layouts/dashboard-layout'
import MainLayout from '@/components/layouts/main-layout'
import path from '@/constants/path'
import Dashboard from '@/routes/dashboard'
import Landing from '@/routes/landing'
import Tasks from '@/routes/tasks'
import { Route, Routes } from 'react-router'

function App() {
  return (
    <Routes>
      <Route path='' element={<MainLayout />}>
        <Route path={path.landing} element={<Landing />} />

        <Route path='' element={<DashboardLayout />}>
          <Route path={path.dashboard} element={<Dashboard />} />
          <Route path={path.tasks} element={<Tasks />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
