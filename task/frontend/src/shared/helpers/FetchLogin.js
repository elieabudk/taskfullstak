export const FetchLogin = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/api/inicio-sesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.mensaje || 'Error en la autenticación'
            };
        }

        // Si la respuesta es exitosa, guardamos el token
        if (data.token) {
            localStorage.setItem('token', data.token);
       
        }

        return {
            success: true,
            data: {
                mensaje: data.mensaje,
                usuario: data.usuario,
                token: data.token
            }
        };

    } catch (error) {
        console.error('Error en el login:', error);
        return {
            success: false,
            error: 'Error de conexión con el servidor'
        };
    }
};

