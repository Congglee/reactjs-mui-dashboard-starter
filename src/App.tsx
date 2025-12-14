import AuthLayout from '@/components/layouts/auth-layout'
import DashboardLayout from '@/components/layouts/dashboard-layout'
import MainLayout from '@/components/layouts/main-layout'
import path from '@/constants/path'
import Dashboard from '@/routes/dashboard'
import Landing from '@/routes/landing'
import Login from '@/routes/login'
import Register from '@/routes/register'
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

        <Route path='' element={<AuthLayout />}>
          <Route path={path.login} element={<Login />} />
          <Route path={path.register} element={<Register />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
