import Register from "./pages/Register"

import './App.scss'
import Login from "./pages/Login"
import Home from "./pages/Home"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
function App() {


  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/Chat/login' />
    }
    return children;

  }

  return (
    <div className="wrap">
      <BrowserRouter>
        <Routes>
          <Route path="/Chat">
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>

            } />
            <Route path="/Chat/login" element={<Login />} />
            <Route path="/Chat/register" element={<Register />} />


          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App
