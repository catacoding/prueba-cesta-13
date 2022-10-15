import { useParams } from 'react-router-dom' 
import { useQuery } from 'react-query'
import { useContext } from 'react';
import {Context} from './main'
import {useForm} from 'react-hook-form'

export default function Producto() {
    const params = useParams()

    const [estado, setEstado] = useContext(Context)

    const { data, isLoading, error } = useQuery(
        "producto",
        () => {
            return fetch(`http://localhost:7778/products/${params.codigo}`)
                .then(res => res.json())
        });


    // get del producto de la cesta
    const cantidad = estado.cesta.find(item => item.producto.ProductID === Number(params.codigo))?.cantidad
    const { register, handleSubmit } = useForm(
        {defaultValues: { cantidad: cantidad } }
    );

    function onSubmit(datos) {
        
        setEstado({
                ...estado, cesta: [ ...estado.cesta.filter(i => i.producto.ProductID != data[0].ProductID), {
                    producto: data[0], cantidad: datos.cantidad,
                    total: data[0].UnitPrice * datos.cantidad
                }]
        }
        )
    }

    if (isLoading) {
        return <div>Cargando...</div>
    }
    return (
        <div>
            <h3>Producto </h3>
            <table className="table w-50">
                <tbody>
                    <tr>
                        <th scope="col">ID</th>
                        <td> {data[0].ProductID}</td>
                    </tr>
                    <tr>
                        <th scope="col">Nombre</th>
                        <td> {data[0].ProductName}</td>
                    </tr>
                    <tr>
                        <th scope="col">Precio</th>
                        <td> {data[0].UnitPrice}</td>
                    </tr>
                </tbody>
            </table>            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Introduzca cantidad</label>
                    <input {...register('cantidad')} type="number" className="form-control" />
                </div>
                <button type="submit" className='btn btn-primary mt-3'>Anadir al carrito</button>
            </form>
        </div>
    )
}