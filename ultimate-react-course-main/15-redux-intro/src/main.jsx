import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import store from './store.jsx'

store.dispatch({ type: 'account/deposit', payload: '500' })

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
)
