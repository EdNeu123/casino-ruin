import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RootNavigation from './routes/RootNavigation.tsx'
import { UserProvider } from './context/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <RootNavigation />
    </UserProvider>
  </React.StrictMode>,
)

