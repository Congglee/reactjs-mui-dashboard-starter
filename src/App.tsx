import AuthLayout from '@/components/layouts/auth-layout'
import DashboardLayout from '@/components/layouts/dashboard-layout'
import MainLayout from '@/components/layouts/main-layout'
import SettingsLayout from '@/components/layouts/settings-layout'
import path from '@/constants/path'
import Analytics from '@/routes/analytics'
import Dashboard from '@/routes/dashboard'
import Landing from '@/routes/landing'
import Login from '@/routes/login'
import NotFound from '@/routes/not-found'
import Register from '@/routes/register'
import Account from '@/routes/settings/account'
import Appearance from '@/routes/settings/appearance'
import Display from '@/routes/settings/display'
import Notifications from '@/routes/settings/notifications'
import Profile from '@/routes/settings/profile'
import Tasks from '@/routes/tasks'
import Users from '@/routes/users'
import { Route, Routes } from 'react-router'

function App() {
  return (
    <Routes>
      <Route path='' element={<MainLayout />}>
        <Route path={path.landing} element={<Landing />} />

        <Route path='' element={<DashboardLayout />}>
          <Route path={path.dashboard} element={<Dashboard />} />
          <Route path={path.analytics} element={<Analytics />} />
          <Route path={path.tasks} element={<Tasks />} />
          <Route path={path.users} element={<Users />} />

          <Route path='' element={<SettingsLayout />}>
            <Route path={path.settings} element={<Profile />} />
            <Route path={path.account} element={<Account />} />
            <Route path={path.appearance} element={<Appearance />} />
            <Route path={path.notifications} element={<Notifications />} />
            <Route path={path.display} element={<Display />} />
          </Route>
        </Route>

        <Route path='' element={<AuthLayout />}>
          <Route path={path.login} element={<Login />} />
          <Route path={path.register} element={<Register />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
