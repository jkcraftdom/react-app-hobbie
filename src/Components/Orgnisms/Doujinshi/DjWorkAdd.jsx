import {Component} from 'react'
import Input from '../../Atomics/Input';
import global from '../../../Funciones/global';
import axios from 'axios'
import laravel from '../../../Servicios/laravel'
import alertify from 'alertifyjs'


class DjWorkAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dj_name: '',
            dj_release: global.now(),
            dj_pages: 0,
            dj_type: 1
        }

        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onCopy = this.onCopy.bind(this)

    }

    onChange(e){        
        let {name, value} = e.target
        this.setState({[name]:value})
    }

    async onSave(e){

        e.preventDefault()

        let imagen = document.getElementById('dj_imagen')

        let res = await global.getBlobImagen(imagen.src).then(x=>x)

        let formData = new FormData()
        formData.append('name', this.state.dj_name)
        formData.append('release', this.state.dj_release)
        formData.append('type', this.state.dj_type)
        formData.append('pages', this.state.dj_pages)
        formData.append('author', this.props.author)
        formData.append('imagen', res)

        const {data} = await axios.post(laravel.makeUrl('/works'),formData, {
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        }).then(res => res).catch(x =>console.log(x))

        alertify.alert('Work', data.process);

        this.props.postSave({name: 'works', value:data.works})

    }

    async onCopy(){

        let imagen = document.getElementById('dj_imagen')

        imagen.src = await global.copyImagen().then(x=>x)
    }

    render() { 
        const {dj_release,dj_pages, dj_name, dj_type}  = this.state

        return (
             <form onSubmit={this.onSave}>
                <div className="row">
                    <div className="col-xl-8">
                        <Input label="Name">
                            <input name="dj_name" onChange={this.onChange} value={dj_name} type="text" className='form-control' />
                        </Input>
                        <Input label="Release" margin="true">
                            <input name="dj_release" onChange={this.onChange} value={dj_release} type="text" className='form-control' />
                        </Input>
                        <Input label="Pages" margin="true">
                            <input name="dj_pages" onChange={this.onChange} value={dj_pages} type="text" className='form-control' />
                        </Input>
                        <Input label="Type" margin="true">
                            <select name="dj_type" onChange={this.onChange} value={dj_type}  className="form-control">
                                <option value="1">Chapter</option>
                                <option value="2">Tantoubon</option>
                                <option value="3">History</option>
                            </select>
                        </Input>
                    </div>
                    <div className="col-xl-4">
                        <div className="text-center mb-2">
                            <img  alt="Imagen manga" id="dj_imagen" className='img-thumbnail comic-img' 
                                src="https://e.rpp-noticias.io/normal/2020/10/09/133613_1007593.jpg"
                                height={500}
                            />
                        </div>                                    
                        <div className="row">
                            <div className="col-xl-6 d-grid">
                                <button type="button" onClick={this.onCopy} className='btn btn-secondary btn-sm'>
                                    Copy
                                </button>
                            </div>
                            <div className="col-xl-6 d-grid">
                                <button type="button" className='btn btn-secondary btn-sm'>
                                    Upload
                                </button>
                            </div>                                                                               
                        </div>
                    </div>
                </div>

                 <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                    <button  className="btn btn-default me-md-2 btn-sm" type="button">Algo</button>
                    <button type="submit" className="btn btn-primary btn-sm" >Save</button>
                </div>

            </form> 
        );
    }
}
 
export default DjWorkAdd;