import {Component} from 'react'
import HeaderCard from '../../Molecules/Global/HeaderCard';
import TableBootstrap from '../../Atomics/TableBootstrap';
import InputGroup from '../../Atomics/InputGroup';
import laravel from '../../../Servicios/laravel';
import alertify from 'alertifyjs';

class Names extends Component {
    constructor(props) {
        super(props);

        this.columns = ['Name', 'Language', 'Source']
        this.onNew = this.onNew.bind(this)
        this.onSave = this.onSave.bind(this)
    }
    
    state = { 
        showData :true,
        names: []
    }

    // Events
    onNew(){
        this.setState({showData:false})
    }

    onSave(e){
        e.preventDefault()

        let form = document.getElementById('form_names')
        let data = new FormData(form)
        const {comic} = this.props

        let response = laravel.axiosInstance.post(`/comic/${comic}/name`,
            data, {
                headers: {
                    'Accept': 'Applcation/json',
                    'Content-Type': 'Application/json'
                }
            })
            .then(res => res.data)
            .catch(ex => {
                let error = true
                return {error, ...ex}
            })
        
        if(response.error == true){
            alertify.alert("Comic name", "error")
            return;
        }

        alertify.alert("Comic name", response.message)

        this.setState({
            name: response.names,
            showData: true
        })

    }

    render() { 
        const {showData, names} = this.state

        return ( 
            <div className="card-body">
                <HeaderCard title="Names">
                    <button onClick={this.onNew}className="btn btn-primary btn-sm">New</button>
                </HeaderCard>
                {
                    showData? <TableBootstrap columns={this.columns}>
                        {names.map(name => 
                        <tr>
                            <td>{name.name}</td>
                            <td>{name.language}</td>
                            <td>{name.source}</td>   
                        </tr>
                        )}
                    </TableBootstrap>:
                    <form onSubmit={this.onSave} id="form_names">
                        <div className="row mb-2">
                            <div className="col-xl-10">
                                <InputGroup label="Name">
                                    <input name="name" type="text" className="form-control" />
                                </InputGroup>
                            </div>
                            <div className="col-xl-2">
                                <button className="btn btn-sm btn-primary">Save</button>
                            </div>                            
                        </div>
                        <div className="row ">
                            <div className="col-xl-6">
                                <InputGroup label="language">
                                    <select name="language" className='form-control'>
                                        <option value="1">Spanish</option>
                                        <option value="2">English</option>
                                        <option value="3">Japanese</option>
                                        <option value="4">Korean</option>
                                    </select>                                    
                                </InputGroup>
                            </div>
                            <div className="col-xl-6">
                                <InputGroup  label="Source">
                                    <input name="source" type="text" className="form-control" />
                                </InputGroup>
                            </div>
                        </div>

                    </form>
                }
            </div>
         );
    }
}
 
export default Names;