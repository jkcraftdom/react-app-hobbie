import {Component} from 'react'
import HeaderPage from '../../Molecules/Global/HeaderPage';
import axios from 'axios'
import laravel from '../../../Servicios/laravel';
import CardBootstrap from '../../Atomics/CardBootstrap'
import TableBootstrap from '../../Atomics/TableBootstrap'
import HeaderCard from '../../Molecules/Global/HeaderCard';
import {Link} from 'react-router-dom'

class ScanlationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scanlations: []
        }

        this.columns = ['Name', 'Website', 'Actions']

        this.onQuery = this.onQuery.bind(this)
    }

    componentDidMount(){
        this.init()
    }

    async init(){

        const {data} = await axios.get(laravel.makeUrl('/scanlations'))
            .then(res => res).catch(ex => console.log(ex))

        this.setState({scanlations: data.scanlations})
    }

    onQuery(e){

    }
    
    render() { 
        const {scanlations} = this.state
        
        return ( 
        <div>
            <HeaderPage name="Scanlations list" to="scanlation/create" toName="Create"/>
            <CardBootstrap>
                <HeaderCard title="All scanlations">
                    <div className="input-group mb-3">
                        <input onKeyDown={this.onQuery} type="text" className="form-control" placeholder='Buscar ...' />
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                    </div>
                </HeaderCard>
                <TableBootstrap columns={this.columns}>
                    {
                        scanlations.map(scanlation => 
                            <tr key={scanlation.id}>
                                <td>{scanlation.name}</td>
                                <td>
                                    <a href={scanlation.website}>website</a>
                                </td>
                                <td>
                                    <Link className="btn btn-primary btn-sm me-2" to={`/scanlation/create/${scanlation.id}`}>
                                        <i className="bi bi-pencil"></i>
                                    </Link>
                                    <button className="btn btn-danger btn-sm">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </TableBootstrap>
            </CardBootstrap>
        </div>
         );
    }
}
 
export default ScanlationPage;