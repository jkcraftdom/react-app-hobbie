import React from 'react'

function GeneroCharacter({genero}) {
    const generoName = genero === 1 ? 'F': 'M'
    return (
        <span className='badge bg-secondary'>{generoName}</span>
    )
}

export default GeneroCharacter;