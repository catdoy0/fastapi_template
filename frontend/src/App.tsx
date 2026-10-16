import { BrowserRouter, Route, Routes } from 'react-router'
import { useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

import LandingPage from './pages/LandingPage'
import SignInPage from './pages/SignInPage'


import { ROUTES } from './routes'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
// import BackendStatusBanner from './components/BackendStatusBanner'
import LoadingScreen from './components/common/LoadingScreen'
import { LoadingProvider } from './context/LoadingContext'
import Home from './modules/dashboard/content/Home'
import DashboardLayout from './pages/DashboardLayout'
import NotFound from './modules/dashboard/content/NotFound'
import TestComponent from './pages/TestComponent'

export default function App() {
  const { loading } = useAuth();

  return (
    <ThemeProvider>
      <BrowserRouter>


        {/* <BackendStatusBanner /> */}
        {loading && <LoadingScreen />}
        <Routes>


          <Route path={ROUTES.LANDINGPAGE} element={
            <PublicRoute>
              <LandingPage/>
            </PublicRoute>
          }/>

          <Route path={ROUTES.AUTHPAGE} element={
            <PublicRoute>
              <SignInPage/>
            </PublicRoute>
          }/>

          <Route path={ROUTES.DASHBOARD.ROOT} element={
            <ProtectedRoute skip={true}>
                <LoadingProvider>
                  <DashboardLayout/>
                </LoadingProvider>
            </ProtectedRoute>
          }>

            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* http://localhost:5173/test-components */}
          {/* remove after development */}
          <Route path="/test-components" element={<TestComponent/>}/>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
