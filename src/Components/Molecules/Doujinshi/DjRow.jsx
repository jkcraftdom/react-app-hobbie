import React from 'react'
import {Link} from 'react-router-dom'

function DjRow({authors}) {
    return ( 
        <tbody>
            {authors.map(author=>
                <tr key={author.id}>
                    <td>{author.id}</td>
                    <td>{author.name}</td>
                    <td></td>
                    <td>
                        <Link className="btn btn-primary btn-sm me-2" to={`/dj/create/${author.id}`}>
                            <i className="bi bi-pencil"></i>
                        </Link>
                        <button className="btn btn-danger btn-sm">
                            <i className="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            )}
        </tbody>
     );
}

 
export default DjRow;