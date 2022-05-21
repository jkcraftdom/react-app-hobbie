import React from 'react'

function TableBootstrap({columns,children}) {
    return (  
        <table className="table mt-2">
            <thead>
                <tr className='table-dark'>
                    {columns.map((column, i) => <th key={i}>{column}</th>)}
                </tr>
            </thead>            
            <tbody>
                {children}
            </tbody>
        </table>
    );
}

export default TableBootstrap;