import React from 'react'

function HeaderCard({title, children}) {
    return (  
        <div className="row mb-2">
            <div className="col-xl-8">
                <h5 className="card-title">{title}</h5>
            </div>
            <div className="col-xl-4">
                {children}
            </div>
        </div> 
    );
}

export default HeaderCard;