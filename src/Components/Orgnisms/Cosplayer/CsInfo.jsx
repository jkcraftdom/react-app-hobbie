import {Component} from 'react'
import laravel from '../../../Servicios/laravel'
import axios from 'axios'
import alertify from 'alertifyjs';
import Input from '../../Atomics/Input';

class CsInfo extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            name : '',
            instagram: '',
            twitter: ''
        }
        this.onSave = this.onSave.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
    }
    
    async onSave(){

        const {data} = await axios.post(laravel.makeUrl('/cosplayers'), {
            name: this.state.name,            
            instagram: this.state.instagram,            
            twitter: this.state.twitter,            
          },{
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          })
          .then(res => res)
          .catch(error => console.log(error));

        let message = data.message? "Exists cosplayer!": "Cosplayer save!"

        alertify.alert("Cosplayer", message)
        
        if(data.author)
            this.props.postSave({name: 'cosplayer', value:data.cosplayer})
    }

    onChangeName(event){
        let {name, value } = event.target
        this.setState({[name]: value})
    }

    render() { 
        const {name, instagram, twitter} = this.state

        return ( 
            <div className="card">
                <div className="card-body">                    
                    <div className="row">
                        <div className="col-xl-10">
                            <h6 className="card-title">Info</h6>
                        </div>
                        <div className="col-xl-2">
                            <button onClick={this.onSave} className="btn btn-primary btn-sm">Save</button>
                        </div>
                    </div>                
                    <form  className="form-inline mt-2" onSubmit={this.onSave}>
                        <div className="form-group row">
                            <label className="col-xl-2 col-form-label">Name</label>
                            <div className="col-xl-10">
                                <input name="name" onChange={this.onChangeName} type="text" className="form-control" value={name} />
                            </div>
                        </div>
                        <Input label="Twitter" margin="2">
                            <input name="twitter" onChange={this.onChangeName}value={twitter} type="text" className="form-control" />
                        </Input>
                        <Input label="Instagram" margin="2" small>
                            <input name="instagram" onChange={this.onChangeName} value={instagram} type="text" className="form-control" />
                        </Input>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default CsInfo;