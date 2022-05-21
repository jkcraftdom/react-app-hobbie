import {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import laravel from '../../Servicios/laravel';
import CsRow from '../Molecules/Cosplayer/CsRow';

class Cosplayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cosplayers : []
        }
    }
    
    componentDidMount(){
        this.init()
    }

    async init(){

        const {data} = await axios.get(laravel.makeUrl('/cosplayers'))
            .then(res => res).catch(ex => console.log(ex))

        this.setState({cosplayers: data.cosplayers})
    }

    render() { 
        const {cosplayers} = this.state
        return (
            <>
            <div className='card mt-2'>
                <div className="card-body">
                    <h6 className='card-title'>Cosplayer</h6>                    
                </div>                
            </div>
            <div className="card mt-2">
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-10">
                            <h6 className='card-title'>All cosplayer</h6>
                        </div>
                        <div className="col-xl-2">
                            <Link to="cosplayer/create" className="btn btn-primary btn-sm">
                                Create
                            </Link>
                        </div>
                    </div>
                    <table className="table mt-2">
                        <thead className='table-dark'>
                            <tr >
                                <th>Name</th>
                                <th>Works</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <CsRow cosplayers={cosplayers}/>
                    </table>
                </div>
            </div>
            </>
          );
    }
}
 
export default Cosplayer;