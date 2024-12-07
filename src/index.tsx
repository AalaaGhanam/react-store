import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './index.scss'
import i18n from './i18n'
import { I18nextProvider } from 'react-i18next'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <I18nextProvider i18n={i18n}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </I18nextProvider>
)
reportWebVitals()
