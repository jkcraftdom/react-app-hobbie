import React from 'react'
import {Link} from 'react-router-dom'

function CsRow({cosplayers, onHoverPost}) {


    return ( 
        <tbody>
            {cosplayers.map(cosplayer=>
                <tr key={cosplayer.id}>
                    <td>{cosplayer.name}</td>
                    <td></td>
                    <td>
                        <Link className="btn btn-primary btn-sm me-2" to={`/cosplayer/create/${cosplayer.id}`}>
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

 
export default CsRow;