import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './lang/language-provider'
import { StoreProvider } from './store/store-provider'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LanguageProvider>
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </LanguageProvider>
)
