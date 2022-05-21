import React from 'react'
import {Link} from 'react-router-dom'
import withLoader from '../../HOC/withLouder';


function MangaRow ({comics, onHoverPost}) {

    function onHover(e,imagen){         
        onHoverPost(e,imagen)   
    }

    return ( 
        <>
            
            <tbody id="mw_tbody">            
                {comics.map(comic => {
                    let name = comic.name.length>100? comic.name.substring(0,70) +"...":comic.name
                    return(
                    <tr key={comic.id} >                    
                        <td className='pointer' onClick={(e) => onHover(e,comic.imagen)}>{name}</td>
                        <td>
                            <span className='badge bg-secondary me-2'>{comic.type_name.name}</span>
                            { comic.madure === 1? 
                                <span className='badge bg-danger'>+18</span>
                                :<></>}
                        </td>
                        <td>
                            <span className="badge bg-secondary">{comic.state}</span>
                        </td>
                        <td>
                            <Link className="btn btn-primary btn-sm me-2" 
                                to={`/manga/create/${comic.id}`}>
                                <i className="bi bi-pencil"></i>
                            </Link>
                            <button className="btn btn-danger btn-sm">
                                <i className="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>    
                )})}
            </tbody>
        </>

     );
}

export default withLoader("comics", 5)(MangaRow);