import {Component} from 'react'
import laravel from '../../../Servicios/laravel'
import axios from 'axios'
import alertify from 'alertifyjs';
import Input from '../../Atomics/Input';

class ScInfo extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            name : '',
            website: '',
            language: 1,
            facebook: '',
            discord: ''

        }
        
        this.onSave = this.onSave.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
    }
    
    async onSave(){

        const {name, website, language, facebook, discord} = this.state
        let existError = false

        const {data} = await axios.post(laravel.makeUrl('/scanlations'), {
            name, website, language, facebook, discord        
          },{
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          })
          .then(res => res)
          .catch(error => {
                existError = true
                console.log(error)
          });

        if(existError){
            alertify.alert("scanlation", "Error")
            return;
        }

        let message = data.message? "Exists scanlation!": "scanlation save!"

        alertify.alert("scanlation", message)
        
        if(data.author)
            this.props.postSave({name: 'scanlation', value:data.scanlation})
    }

    onChangeName(event){
        let {name, value } = event.target
        this.setState({[name]: value})
    }

    render() { 
        const {name, website, language, facebook, discord} = this.state

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
                        <Input label="Name">
                            <input name="name" onChange={this.onChangeName} value={name} type="text" className="form-control"  />    
                        </Input>
                        <Input label="Language" margin="2" small>
                            <select name="language"  onChange={this.onChangeName} value={language} className="form-control">
                                <option value="1">Spanish</option>
                                <option value="2">English</option>
                            </select>
                        </Input>
                        <Input label="Website" margin="2">
                            <input name="website" onChange={this.onChangeName} value={website} type="text" className="form-control" />
                        </Input>
                        <Input label="Facebook" margin="2" small>
                            <input name="facebook" onChange={this.onChangeName} value={facebook} type="text" className="form-control" />
                        </Input>
                        <Input label="Discord" margin="2">
                            <input name="discord" onChange={this.onChangeName} value={discord} type="text" className="form-control" />
                        </Input>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default ScInfo;