import ReactDOM from 'react-dom/client'
import './index.css'
import { LanguageProvider } from './lang/language-provider'
import { StoreProvider } from './store/store-provider'
import App from './App'
import { AuthProvider } from './providers/auth-provider'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LanguageProvider>
    <StoreProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </StoreProvider>
  </LanguageProvider>
)
