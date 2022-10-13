import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function Home(){
    return (
            <div className='container'>
                <div className='text-end'>
                    <Link className='mx-3' to="/productos">Productos</Link>
                    <Link to="/cesta">Cesta</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}