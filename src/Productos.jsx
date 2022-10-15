
import { useQuery } from "react-query"
import { Link } from 'react-router-dom'
export default function Productos() {

    const { isLoading, data, error } = useQuery("pro", () => {
        return fetch("http://localhost:7778/products").then(res => res.json())
    });

    if (isLoading) {
        return <div>Cargando...</div>
    }
    if (error) {
        return <div>{JSON.stringify(error)}</div>
    }
    return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(producto => (
                            <tr key={producto.ProductID}>
                                <td>
                                    <Link to={`/productos/${producto.ProductID}`}>
                                        {producto.ProductName}
                                    </Link>
                                </td>
                                <td>{producto.UnitPrice}</td>
                            </tr>    
                        ))
                        }
                    </tbody>
                </table>
            </div>
    )
}