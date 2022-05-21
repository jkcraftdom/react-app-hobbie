import {Component} from 'react'
import laravel from '../../../Servicios/laravel'
import axios from 'axios'
import alertify from 'alertifyjs';
import Input from '../../Atomics/Input';
import global from '../../../Funciones/global';

class HnInfo extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            name : '',
            adaptation: 1,
        }
        this.onSave = this.onSave.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
    }
    
    componentDidUpdate(prevProps){   

        const {hentai} = this.props

        if(hentai !== prevProps.hentai){
            this.setState({name: hentai.name, adaptation: hentai.adaptation})
            let imagen = document.getElementById('hn_imagen') 
            imagen.src = hentai.imagen
        }

    }

    async onSave(){

        let imagen = document.getElementById('hn_imagen')    
        let form = document.getElementById('frm_hentai')
        let formData = new FormData(form)
        let res = await global.getBlobImagen(imagen.src).then(x=>x)

        formData.append('imagen', res)

        const {data} = await axios.post(laravel.makeUrl('/hentais'),formData, {
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        }).then(res => res).catch(x =>console.log(x))

        alertify.alert("Hentai", data.message)
        
        if(data.hentai)
            this.props.postSave({name: 'hentai', value: data.hentai})
    }

    onChangeName(event){
        let {name, value } = event.target
        this.setState({[name]: value})
    }

    async onPasteImagen(){
        let ctrImagen = document.getElementById('hn_imagen')
        ctrImagen.src = await global.copyImagen().then(x=>x)
    }

    render() { 
        const {name, adaptation} = this.state

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
                    <form  id="frm_hentai" className="form-inline mt-2" method='post'>
                        <Input label="Name">
                            <input name="name" onChange={this.onChangeName} type="text" className="form-control" value={name} />
                        </Input>
                        <Input label="Adaptation" margin small>
                            <select onChange={this.onChangeName} value={adaptation} name="adaptation" className="form-control">
                                <option value="1">Original</option>
                                <option value="2">Manga</option>
                                <option value="3">Eroge</option>
                            </select>
                        </Input>
                        <Input label="Imagen" margin>
                            <div className="text-center">
                                <img id="hn_imagen" className='img-thumbnail comic-img' src="https://e.rpp-noticias.io/normal/2020/10/09/133613_1007593.jpg" alt="hentai imagen" />                               
                            </div>
                            <div className="text-center">
                                <button type="button" onClick={this.onPasteImagen} className='btn btn-link btn-sm'>Paste imagen</button>
                            </div>                            
                        </Input>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default HnInfo;