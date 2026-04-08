import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, createSystem } from '@chakra-ui/react'
import { GameSessionProvider } from './lib/GameSessionContext'

const system = createSystem()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <BrowserRouter>
        <GameSessionProvider>
          <App />
        </GameSessionProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
