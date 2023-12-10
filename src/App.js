import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createContext, useContext, useReducer } from 'react'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import { GenerateRoutes, privateRoutes, publicRoutes } from './services/routes'
import { reducer, initialState } from './services/authReducer'
import NotFound from './components/NotFound/NotFound'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Router>
        <div className="App">
          <ReactNotifications />
          <Routes>
            {GenerateRoutes(publicRoutes)}
            {state.isAuthenticated && GenerateRoutes(privateRoutes)}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)
export default App
