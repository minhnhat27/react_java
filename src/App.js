import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createContext, useContext, useReducer } from 'react'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import { generateRoutes, privateRoutes, publicRoutes } from './services/routes'
import { reducer, initialState } from './services/authReducer'
import NotFound from './components/NotFound/NotFound'

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)
function App() {
  const [state, dispath] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispath }}>
      <Router>
        <div className="App">
          <ReactNotifications />
          <Routes>
            {generateRoutes(publicRoutes)}
            {state.isAuthenticated && generateRoutes(privateRoutes)}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
