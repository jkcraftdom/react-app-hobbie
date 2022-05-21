
import React from "react";
import {Link} from 'react-router-dom'

function Breacrumb({ruta, rutaName, actualName }) {
    return ( 
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={ruta}>{rutaName}</Link></li>
                <li className="breadcrumb-item active" aria-current="page"><b>{actualName}</b></li>
            </ol>
        </nav>
     );
}

export default Breacrumb;