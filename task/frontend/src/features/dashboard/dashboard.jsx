import { useState, useEffect } from 'react';
import { Tabla } from '../../shared/components/layout/tabla';
import { FetchTareas } from '../../shared/helpers/FetchTareas';

export const Dashboard = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await FetchTareas();
                // Extraer el array de tareas de la respuesta
                if (response && response.tareas) {
                    setData(response.tareas);
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error('Error al obtener tareas:', error);
                setError(error.message);
                // Si no hay token, redirigir al login
                if (error.message === 'No hay token de autenticación') {
                    window.location.href = '/login';
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center p-5">Cargando...</div>;
    }

    if (error) {
        return <div className="alert alert-danger m-3">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Dashboard</h1>
            <Tabla data={data} />
        </div>
    );
};

