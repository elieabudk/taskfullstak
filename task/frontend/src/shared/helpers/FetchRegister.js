export const FetchRegister = async (userData) => {
    try {
        console.log('Datos que se envían al servidor:', userData);
        
        const response = await fetch('http://localhost:3000/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password
            })
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        if (!response.ok) {
            return {
                success: false,
                error: data.mensaje || 'Error en el registro'
            };
        }

        return {
            success: true,
            data: {
                mensaje: data.mensaje,
                usuario: data.usuario
            }
        };

    } catch (error) {
        console.error('Error en el registro:', error);
        return {
            success: false,
            error: 'Error de conexión con el servidor'
        };
    }
}; 