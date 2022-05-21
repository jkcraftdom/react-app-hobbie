import {Component} from 'react'
import laravel from '../../../Servicios/laravel'
import axios from 'axios'
import alertify from 'alertifyjs';

class DjAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
        }
        this.onSave = this.onSave.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
    }
    
    async onSave(){

        const {data} = await axios.post(laravel.makeUrl('/authors'), {
            name: this.state.name,            
          },{
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          })
          .then(res => res)
          .catch(error => console.log(error));

        let message = data.message? "Exists author!": "Author save!"

        alertify.alert("Author", message)
        
        if(data.author)
            this.props.postSave({name: 'author', value:data.author})
    }

    onChangeName(event){
        this.setState({name: event.target.value})
    }

    render() { 
        const {name} = this.state

        return ( 
            <div className="card">
                <div className="card-body">                    
                    <div className="row">
                        <div className="col-xl-10">
                            <h6 className="card-title">Author</h6>
                        </div>
                        <div className="col-xl-2">
                            <button onClick={this.onSave} className="btn btn-primary btn-sm">Save</button>
                        </div>
                    </div>                
                    <form  className="form-inline mt-2" onSubmit={this.onSave}>
                        <div className="form-group row">
                            <label className="col-xl-2 col-form-label">Name</label>
                            <div className="col-xl-10">
                                <input onChange={this.onChangeName} type="text" className="form-control" value={name} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default DjAuthor;