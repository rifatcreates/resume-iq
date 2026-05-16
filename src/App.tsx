import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import DashboardPage from './pages/DashboardPage'
import AnalyzePage from "./pages/AnalyzePage"
import { useAuth } from "./hooks/useAuth"

function App() {
  const {user, loading} = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-main-gradient flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-500/30 border-t-teal-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage/>}
        />

        <Route
          path="/dashboard"
          element={user ? <DashboardPage/> : <Navigate to="/login" />}
        />

        <Route
          path="/analyze"
          element={user ? <AnalyzePage/> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  )
}
export default App
