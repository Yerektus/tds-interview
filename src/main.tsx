import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './common/styles/index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/routes'
import { Provider } from 'react-redux'
import { store } from './common/stores/store'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>
)
