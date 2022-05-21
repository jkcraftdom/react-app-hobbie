import {Component} from 'react'
import PopperImagen from '../../Molecules/Global/PopperImagen';
import Global from '../../../Funciones/global'

class DjWorks extends Component {

    constructor(props) {

        super(props);

        this.state = {
            works: []
        }
        this.onHover = this.onHover.bind(this)
    }

    componentDidMount(){

        if(this.props.works){
            this.setState({works: this.props.works})
        }        
    }

    componentDidUpdate(prevProps){

        if (this.props.works !== prevProps.works) {
            this.setState({works: this.props.works})
        }
    }


    //events
    onHover(e, imagen){

        Global.showPopper(e, imagen)
    }

    render() { 

        const {works} = this.state

        return ( 
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-10">
                            <h6 className="card-title">Works</h6>
                        </div>
                        <div className="col-xl-2">
                            <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#dj_modal">
                                <i className="bi bi-plus"></i>
                            </button>
                        </div>                            
                    </div>
                    <PopperImagen/>
                    <table className="table mt-2">
                        <thead className='table-dark'>
                            <tr>
                                <th>Name</th>
                                <th>Release</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {works.map(work => 
                                <tr key={work.id}>
                                    <td onClick={(e)=>this.onHover(e,work.imagen)} className="pointer">
                                        <small>{work.name}</small>
                                    </td>
                                    <td><small>{work.release}</small></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                </div>
            </div>
         );
    }
}
 
export default DjWorks;