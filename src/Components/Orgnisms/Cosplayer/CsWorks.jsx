import {Component} from 'react'
import DeleteButton from '../../Molecules/Global/DeleteButton'
import PopperImagen from '../../Molecules/Global/PopperImagen';
import Global from '../../../Funciones/global'
import TableBootstrap from '../../Atomics/TableBootstrap';
import CardBootstrap from '../../Atomics/CardBootstrap'
import { Button } from 'bootstrap';

class CsWorks extends Component {

    constructor(props) {

        super(props);

        this.state = {
            works: []
        }

        this.columns = ['Name', 'Elemnts', 'Release', 'Actions']

        this.onHover = this.onHover.bind(this)
        this.onPostDeleting = this.onPostDeleting.bind(this)
        this.onOpenModal = this.onOpenModal.bind(this)
    }

    onHover(e, imagen){
        Global.showPopper(e, imagen)
    }

    onPostDeleting(data){
        this.setState({'works': data.works})
    }

    onEditWork(work){
        this.props.onEditWork(work)
    }

    onOpenModal(){
        this.props.onEditWork(null)
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


    render() { 

        const {works} = this.state

        return ( 
            <CardBootstrap>
                    <div className="row">
                        <div className="col-xl-10">
                            <h6 className="card-title">Works</h6>
                        </div>
                        <div className="col-xl-2">
                            <button onClick={this.onOpenModal} id="btn_modal" className="btn btn-primary btn-sm"  >
                                <i className="bi bi-plus"></i>
                            </button>
                        </div>                            
                    </div>
                    <PopperImagen/>
                    <TableBootstrap columns={this.columns}>
                        {works.map(work => 
                                <tr key={work.id}>
                                    <td onClick={(e)=>this.onHover(e,work.imagen)} className="pointer">
                                        <small>{work.title}</small>
                                    </td>
                                    <td><small>{work.elements}</small></td>
                                    <td><small>{work.release}</small></td>
                                    <td>
                                        <button onClick={() =>this.onEditWork(work)} className="btn btn-primary btn-sm me-2"><i className="bi bi-pencil"></i></button>
                                        <DeleteButton url={"cosplayworks/" + work.id} onPostDeleting={this.onPostDeleting}/>
                                    </td>
                                </tr>
                        )}
                    </TableBootstrap>     
            </CardBootstrap>                    
         );
    }
}
 
export default CsWorks;