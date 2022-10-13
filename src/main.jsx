import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Cesta from './Cesta'
import Productos from './Productos'
import Producto from './Producto'


import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
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
  </React.StrictMode>
)
