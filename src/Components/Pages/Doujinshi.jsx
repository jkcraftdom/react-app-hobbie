import {Component} from 'react'
import DjRow from '../Molecules/Doujinshi/DjRow';
import HeaderPage from '../Molecules/Global/HeaderPage';
import axios from 'axios'
import laravel from '../../Servicios/laravel';

class Doujinshi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authors: []
        }

        this.onQuery = this.onQuery.bind(this)
    }

    componentDidMount(){
        this.init()
    }

    async init(){

        const {data} = await axios.get(laravel.makeUrl('/authors'))
            .then(res => res).catch(ex => console.log(ex))

        this.setState({authors: data.authors})
    }

    onQuery(e){

    }
    
    render() { 
        const {authors} = this.state
        
        return ( 
        <div>
            <HeaderPage name="Author list" to="dj/create" toName="Agregar"/>
            <div className="card" >
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-6">
                            <h5 className="cart-title">All authons</h5>
                        </div>
                        <div className="col-xl-6">
                            <div className="input-group mb-3">
                            <select name="f_type" id="" className="form-control me-2">
                                <option value="1">Manga</option>
                                <option value="1">Manga</option>
                                <option value="1">Manga</option>
                                <option value="1">Manga</option>
                            </select>
                            <input onKeyDown={this.onQuery} type="text" className="form-control" placeholder='Buscar ...' />
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead className='table-dark'>
                            <tr>
                                <th>Id</th>
                                <th style={{"width": "60%"}}>Name</th>
                                <th>State</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <DjRow authors={authors}/>
                    </table>
                </div>
            </div>
        </div>
         );
    }
}
 
export default Doujinshi;