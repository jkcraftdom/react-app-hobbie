
import React from 'react'
import {Link} from 'react-router-dom'
import MangaRow from '../../Molecules/Manga/MangaRow'
import laravel from '../../../Servicios/laravel'
import axios from 'axios'
import {createPopper } from '@popperjs/core'

class MangaList extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            comics: [],
            total: 0,
            query: '',
            isQuery: false,
        }

        this.onQuery = this.onQuery.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onHoverPost = this.onHoverPost.bind(this)
        this.onFilter = this.onFilter.bind(this)
        this.popper = null
    }

    

    async componentDidMount(){
        var data = await fetch('http://127.0.0.1:8000/api/comics').then(res => res.json())        
        this.setState({
            comics: data.comics,
            total: data.total
        })
    }

    onQuery(e){
        if(e.key === "Enter"){
            this.onFilter()
        }
        
    }

    async onFilter(){
        this.setState({isQuery: true})
        const filterType = document.getElementById('f_type').value
        const {query} = this.state
        let url = '/comics/more/query?'
        

        if (filterType !== "0"){
            url += 't='+filterType
        }

        if (query !== ""){
            url += url.includes("t=")? '&q=': 'q='
            url += query
        }

        const {data} = await axios.get(laravel.makeUrl(url)).then(res=>res)
        this.setState({comics: data.comics})
    }

    onChange(e){
        this.setState({query: e.target.value})
    }

    onHoverPost(e, imagenComic){
        let tooltip = document.getElementById("tooltip")

        if(imagenComic === null){
            tooltip.removeAttribute('data-show');
            return
        }

        
        let imagen = tooltip.firstChild

        tooltip.setAttribute('data-show', '')
        imagen.src = imagenComic
        
        this.popper = createPopper(e.target, tooltip,  {placement: 'top',})
        //this.popper.update();

    }

    render() { 
        const {comics, total, query, isQuery} = this.state
        return (
            <div>
                <div className="card mb-2 mt-2" >
                    <div className="card-body" >
                        <div className='row'> 
                            <div className="col-xl-2">
                                <b>Manga List </b>
                            </div>                       
                            <div className='col-xl-1 offset-xl-9'>
                                <Link className='btn btn-primary btn-sm' to="/manga/create">Agregar</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card" >
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-xl-6">
                                <h5 className="cart-title">All mangas ({comics.length}/{total})</h5>
                            </div>
                            <div className="col-xl-3">                                
                                <select onChange={this.onFilter} name="f_type" id="f_type" className="form-control me-2">
                                    <option value="0">Fitrar por ...</option>
                                    <option value="1">Manga</option>
                                    <option value="2">Manwhua</option>
                                    <option value="3">Manhua</option>
                                    <option value="4">Weebtoon</option>
                                </select>
                            </div>
                            <div className='col-xl-3'>
                                <div class="input-group">
                                    <input onKeyDown={this.onQuery} onChange={this.onChange} value={query} name="query" type="text" className="form-control" placeholder='Buscar ...' />
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button">Seach</button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div id="tooltip" className='text-center'>
                            <img className="img-comic rounded" src="..."  alt="comic"/>
                            <div id="arrow" data-popper-arrow></div>
                        </div>
                        <table className="table table-striped">
                            <thead className='table-dark'>
                                <tr>                                    
                                    <th style={{"width": "65%"}}>Name</th>
                                    <th>Type</th>
                                    <th>State</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <MangaRow isQuery={isQuery} comics={comics} onHoverPost={this.onHoverPost}/>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}
 
export default MangaList;