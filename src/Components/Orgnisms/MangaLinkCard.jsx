import {Component} from 'react'
import alertify from 'alertifyjs'
import TableBootstrap from '../Atomics/TableBootstrap'
import InputGroup from '../Atomics/InputGroup'

class MangaLinkCard extends Component {

    constructor(props){
        super(props)

        this.state = {
            links: []            
        }

        this.columns = ['Link', 'Actions']

        this.onAddChapter = this.onAddChapter.bind(this)
    }

    async onAddChapter(e){
        e.preventDefault()
        var form = document.getElementById('formLink')
        var language = form.elements['language'].value
        var link = form.elements['link'].value
        var title = form.elements['title'].value
        var error = false

        var data = await fetch(`http://127.0.0.1:8000/api/comic/${this.props.manga}/link`,{
            method: 'post',
            headers: {
                'Accept': 'Applcation/json',
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({language,link, title})
        }).then(res => res.json())
            .catch(e => {
                alertify.alert("Error", e)
                error = true
            })

        if(error){
            return
        }


        alertify.alert("Link", "Creado")

        this.setState({links: data.links})

        this.props.onPostSave({links: data.links})

    }

    componentDidMount(){        
        if(this.props.links){
            this.setState({links: this.props.links})
        }
    }

    componentDidUpdate(prevProps) {
        // Uso tipico (no olvides de comparar las props):
        if (this.props.links !== prevProps.links) {
            this.setState({links: this.props.links})
        }
    }


    shortLink(link){
        let start = link.indexOf('//')
        let end = link.indexOf('/', start +2)
        return link.substring(start + 2, end)
    }

    render() { 
        return (
            <div className="card-body">
                <div className="row mb-2">
                    <div className="col-xl-10">
                        <h5 className="card-title">Links</h5>
                    </div>
                    <div className="col-xl-2">
                        <button className="btn btn-primary btn-sm" onClick={this.onAddChapter}>Save</button>
                    </div>
                </div>                
                <form onSubmit={this.onAddChapter.bind(this)} id="formLink">
                    <div className="row mb-2">
                        <div className="col-xl-6">
                            <InputGroup label="Title">
                                <input type="text" name="title" className="form-control" />
                            </InputGroup>
                        </div>
                        <div className="col-xl-6 ">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <small>Lang</small>
                                </span>
                                <select name="language" className="form-control form-control-sm">   
                                    <option value="1">es</option>
                                    <option value="2">en</option>
                                    <option value="3">ja</option>
                                    <option value="4">kr</option>
                                    <option value="5">ch</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-xl-12">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <small>Link</small>
                                </span>
                                <input type="text" name="link" className='form-control form-control-sm'/>
                            </div>
                            
                        </div>
                    </div>
                </form>

                <TableBootstrap columns={this.columns}>
                    {
                        this.state.links.map(link => 
                            <tr key={link.id}>                                
                                <td>
                                    <a href={link.link}>
                                        {this.shortLink(link.link)}
                                    </a>
                                    <span className='badge bg-secondary ms-2'>
                                        {link.language}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm me-2">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                    <button className="btn btn-primary btn-sm ">
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                </td>
                            </tr>   
                        )
                    }
                </TableBootstrap>
            </div>
        );
    }
}
 
export default MangaLinkCard;