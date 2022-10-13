import { useParams } from 'react-router-dom'

export default function Producto() {
    const params = useParams()
    return (
            <div>
                Producto {params.codigo}
            </div>
    )
}