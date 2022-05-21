import {Component} from 'react'
import DeleteButton from '../../Molecules/Global/DeleteButton'
import PopperImagen from '../../Molecules/Global/PopperImagen';
import Global from '../../../Funciones/global'
import CardBootstrap from '../../Atomics/CardBootstrap'
import HeaderCard from '../../Molecules/Global/HeaderCard';
import TableBootstrap from '../../Atomics/TableBootstrap'

class HnChapters extends Component {

    constructor(props) {

        super(props);

        this.state = {
            chapters: []
        }

        this.columns = ['Chapter', 'Duration', 'File', 'Actions']

        this.onHover = this.onHover.bind(this)
        this.onPostDeleting = this.onPostDeleting.bind(this)
    }

    onHover(e, imagen){

        Global.showPopper(e, imagen)
    }

    onPostDeleting(data){
        this.setState({'chapters': data.chapters})
    }

    componentDidMount(){

        if(this.props.chapters){
            this.setState({chapters: this.props.chapters})
        }        
    }

    componentDidUpdate(prevProps){

        if (this.props.chapters !== prevProps.chapters) {
            this.setState({chapters: this.props.chapters})
        }
    }


    render() { 

        const {chapters} = this.state

        return ( 
                <CardBootstrap>
                    <HeaderCard title="Chapters">
                        <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#dj_modal">
                            <i className="bi bi-plus"></i>
                        </button>
                    </HeaderCard>
                    <PopperImagen/>
                    <TableBootstrap columns={this.columns}>
                        {chapters.map(chapter => 
                            <tr key={chapter.id}>
                                <td onClick={(e)=>this.onHover(e,chapter.imagen)} className="pointer">
                                    <small>{chapter.chapter}</small>
                                </td>
                                <td><small>{chapter.duration}</small></td>
                                <td>
                                    <button className="btn btn-link btn-sm">Ver file</button>
                                </td>
                                <td>
                                    <DeleteButton url={"hentai/chapters/" + chapter.id} onPostDeleting={this.onPostDeleting}/>
                                </td>
                            </tr>
                        )}
                    </TableBootstrap>
                </CardBootstrap>
         );
    }
}
 
export default HnChapters;