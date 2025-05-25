import React, { useState } from 'react';

export const Tarea = () => {
    const [tarea, setTarea] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/crear-tarea', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ task: tarea })
            });

            const data = await response.json();
            console.log('Respuesta:', data);
            
            // Limpiar el input después de enviar
            setTarea('');

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <form onSubmit={handleSubmit} className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Escribe tu tarea..."
                        value={tarea}
                        onChange={(e) => setTarea(e.target.value)}
                        required
                    />
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >
                        Agregar
                    </button>
                </form>
            </div>
        </div>
    );
};
        