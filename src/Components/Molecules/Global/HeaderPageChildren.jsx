import {Link} from 'react-router-dom'

function HeaderPage({headerConfig, name, children}) {
    return ( 
        <div className="card mb-2 mt-2" >
            <div className="card-body pb-0">
                <div className='row'>                        
                    <div className='col-xl-8'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={headerConfig.toBack}>{headerConfig.backName}</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <b>{name}</b>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-xl-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
     );
}

export default HeaderPage;