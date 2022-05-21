import {Link} from 'react-router-dom'

function HeaderPage({name, to, toName}) {
    return ( 
        <div className="card mb-2 mt-2" >
            <div className="card-body">
                <div className='row'> 
                    <div className="col-xl-2">
                        <b>{name}</b>
                    </div>                       
                    <div className='col-xl-1 offset-xl-9'>
                        <Link className='btn btn-primary btn-sm' to={to}>
                            {toName}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default HeaderPage;