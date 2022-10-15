import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Productos from './Productos'
import Cesta from './Cesta'
import Producto from './Producto'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import {createContext} from 'react'
export const Context = createContext(null)
const queryClient = new QueryClient()

function App() {
  const [estado, setEstado] = React.useState({
    cesta:[]
  })
  return <React.StrictMode>
    <Context.Provider value={[estado, setEstado]}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} >
              <Route index element={<Productos/>} /> 
              <Route path="*" element={<Productos/>} />
              <Route path="productos" element={<Productos/>} />
              <Route path="cesta" element={<Cesta/>} />
              <Route path="productos/:codigo" element={<Producto/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Context.Provider>
  </React.StrictMode>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App/>
)

