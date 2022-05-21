import {Component} from 'react'
import HeaderPage from '../../Molecules/Global/HeaderPage';
import axios from 'axios'
import laravel from '../../../Servicios/laravel';
import CardBootstrap from '../../Atomics/CardBootstrap'
import TableBootstrap from '../../Atomics/TableBootstrap'
import HeaderCard from '../../Molecules/Global/HeaderCard';
import {Link} from 'react-router-dom'

class HentaiPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hentais: []
        }

        this.columns = ['Name', 'Adaptation', 'Actions']

        this.onQuery = this.onQuery.bind(this)
    }

    componentDidMount(){
        this.init()
    }

    async init(){

        const {data} = await axios.get(laravel.makeUrl('/hentais'))
            .then(res => res).catch(ex => console.log(ex))

        this.setState({hentais: data.hentais})
    }

    onQuery(e){

    }
    
    render() { 
        const {hentais} = this.state
        
        return ( 
        <div>
            <HeaderPage name="Hentai list" to="hentai/create" toName="Create"/>
            <CardBootstrap>
                <HeaderCard title="All hentais">
                    <div className="input-group mb-3">
                        <input onKeyDown={this.onQuery} type="text" className="form-control" placeholder='Buscar ...' />
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                    </div>
                </HeaderCard>
                <TableBootstrap columns={this.columns}>
                    {
                        hentais.map(hentai => 
                            <tr key={hentai.id}>
                                <td>{hentai.name}</td>
                                <td>{hentai.adaptation}</td>
                                <td>
                                    <Link className="btn btn-primary btn-sm me-2" to={`/hentai/create/${hentai.id}`}>
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
 
export default HentaiPage;