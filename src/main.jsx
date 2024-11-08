import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/home.jsx'
import Error from './components/Error.jsx'
import CountryDetails from './components/CountryDetails.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    errorElement: <Error />,
    children:[
      {
        path:'/',
        element: <Home />
      },
      {
        path:'/contact',
        element: <h1 className='text-3xl'>contact page</h1>
      },
      {
        path:'/country',
        element: <CountryDetails />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
