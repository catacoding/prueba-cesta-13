import { Outlet, Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import {Context} from './main'
import {ethers} from 'ethers'

export default function Cesta() {
    const [estado, setEstado] = useContext(Context)
    const [cuenta, setCuenta] = useState()
    const [txOk, setTxOk] = useState()
    const [txRechazo, setTxRechazo] = useState()    
    const total = estado.cesta.reduce((acum, item) => acum + item.total, 0)

    useEffect(() => {
        ethereum && ethereum.request({ method: 'eth_requestAccounts' }).then(i => {
            setCuenta(i[0])
            ethereum.on('accountsChanged', (i) => {
                setCuenta(i[0])
            })
        });
    }, [])
    async function pagar() {
        setTxOk(false)
        setTxRechazo(false)
        const transactionParameters = {
            to: '0xCB8Aedd5576A490131508b3c162Dcf4c3707325a', // Cuenta del comercio.
            from: ethereum.selectedAddress, // la cuenta activa del metamask
            value: ethers.utils.parseEther(total.toString()).toHexString()
        };
        try {
            const txHash = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            setTxOk(txHash) // tx ok
        } catch (error) {
            setTxRechazo(error) // cancelada por la razon que sea
        } finally {
            // final
        }
    }
    return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estado.cesta.map(item => (
                            <tr key={item.producto.ProductID}>
                                <td>
                                    <Link to={`/productos/${item.producto.ProductID}`}>
                                        {item.producto.ProductName}
                                    </Link>
                                </td>
                                <td>{item.producto.UnitPrice}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>Total:  {total} </div>  
                <div>Cuenta:  {cuenta} </div>        
                <button className='my-3 btn btn-primary' onClick={() => {pagar()}}>Pagar</button>   
                {txOk && <div className='my-3 alert alert-success'>Transaction OK: {txOk}</div>} 
                {txRechazo && <div className='my-3 alert alert-danger'>Transaction cancelada: {JSON.stringify(txRechazo.message)}</div>}
            </div>
    )
}