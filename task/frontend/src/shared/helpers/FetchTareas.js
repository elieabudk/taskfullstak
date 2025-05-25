export const FetchTareas = async () => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No hay token de autenticación');
        }

        const response = await fetch('http://localhost:3000/api/obtener-tareas', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener las tareas');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al obtener tareas:', error);
        throw error;
    }
}; 