import React, { useState } from 'react';

export const Tabla = ({ data = [] }) => {
    const [selectedRow, setSelectedRow] = useState(null);

    // Verificar si data es válido y tiene elementos
    if (!Array.isArray(data) || data.length === 0) {
        return <div className="alert alert-info">No hay datos para mostrar</div>;
    }

    // Verificar si el primer elemento es un objeto válido
    if (!data[0] || typeof data[0] !== 'object') {
        return <div className="alert alert-warning">Formato de datos inválido</div>;
    }

    // Obtener las columnas del primer elemento
    const columnas = Object.keys(data[0]);

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        {columnas.map((columna, index) => (
                            <th key={index}>{columna}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((fila, indexFila) => (
                        <tr key={indexFila}>
                            {columnas.map((columna, indexColumna) => (
                                <td key={indexColumna}>
                                    {fila[columna] !== null && fila[columna] !== undefined 
                                        ? fila[columna].toString() 
                                        : ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};