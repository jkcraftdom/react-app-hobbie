import {Component} from 'react'
import global from '../../../Funciones/global';
import axios from 'axios'
import laravel from '../../../Servicios/laravel'
import alertify from 'alertifyjs'
import Input from '../../Atomics/Input';


class DetailWorkCosplayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cs_title: '',
            cs_release: global.now(),
            cs_elements: 0,
            cs_hasvideo: false,
        }

        this.columns = ['Link', 'Origen', 'State', 'Created' ,'Expired']
        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onCopy = this.onCopy.bind(this)

    }

    componentDidMount(){
        const {work} = this.props
        if(work){
            this.init(work)
        }
    }

    componentDidUpdate(prevProps){
        const {work} = this.props
        if(work !== prevProps.work){
            this.init(work)
        }

    }

    init(work){
       
        this.setState({
            cs_title: work.title,
            cs_release: work.release,
            cs_elements: work.elements,
            cs_hasvideo: work.hasvideo ===1,
        })
    }

    onChange(e){        
        let {name, value} = e.target
        this.setState({[name]:value})
    }



    async onSave(e){

        e.preventDefault()

        let imagen = document.getElementById('cs_imagen')

        let res = await global.getBlobImagen(imagen.src).then(x=>x)

        let formData = new FormData()
        formData.append('title', this.state.cs_title)
        formData.append('release', this.state.cs_release)
        formData.append('hasvideo', this.state.cs_hasvideo? 1: 0)
        formData.append('elements', this.state.cs_elements)
        formData.append('cosplayer', this.props.cosplayer)
        formData.append('imagen', res)

        const {data} = await axios.post(laravel.makeUrl('/cosplayworks'),formData, {
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        }).then(res => res).catch(x =>console.log(x))

        alertify.alert('Work', data.process);

        this.props.onPostSave(data.work, data.works)

    }

    async onCopy(){

        let imagen = document.getElementById('cs_imagen')
        imagen.src = await global.copyImagen().then(x=>x)
    }



    render() { 
        const {cs_release,cs_elements, cs_title, cs_hasvideo}  = this.state

        return ( 
            <form onSubmit={this.onSave}>
                <div className="row">
                    <div className="col-xl-8">
                        <Input label="Title">
                            <input name="cs_title" value={cs_title} onChange={this.onChange} type="text" className='form-control' />
                        </Input>
                        <Input label="Release" margin="true">
                            <input name="cs_release" value={cs_release} onChange={this.onChange}  type="text" className='form-control' />
                        </Input>
                        <Input label="Elements" margin="true">
                            <input name="cs_elements" value={cs_elements} onChange={this.onChange}  type="text" className='form-control' />
                        </Input>
                        <Input label="Has video?" margin="true" small>
                            <input name="cs_hasvideo" value={cs_hasvideo} onChange={this.onChange}  type="checkbox" className='form-check-input mt-2' />
                        </Input>
                    </div>
                    <div className="col-xl-4">
                        <div className="text-center mb-2">
                            <img  alt="Imagen manga" id="cs_imagen" className='img-thumbnail comic-img' 
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
                    <button  className="btn btn-default me-md-2 btn-sm" type="button">Clear</button>
                    <button type="submit" className="btn btn-primary btn-sm" >Save</button>
                </div>                
            </form> 
         );
    }
}
 
export default DetailWorkCosplayer;