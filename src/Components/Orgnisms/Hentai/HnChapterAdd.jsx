import {Component} from 'react'
import Input from '../../Atomics/Input';
import global from '../../../Funciones/global';
import axios from 'axios'
import laravel from '../../../Servicios/laravel'
import alertify from 'alertifyjs'


class HnChapterAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chapter: '',
            duration: '00:00',
        }

        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)

    }

    onChange(e){        
        let {name, value} = e.target
        this.setState({[name]:value})
    }

    async onSave(e){

        e.preventDefault()

        let form = document.getElementById('form_hn_chapter')
        let formData = new FormData(form)
        formData.append('hentai', this.props.hentai)

        const res = await axios.post(laravel.makeUrl('/hentai/chapters'),formData, {
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        }).then(res => res).catch(x =>console.log(x))

        if(res.data){
            alertify.alert('Chapter', res.data.message);
            this.props.postSave({name: 'chapters', value: res.data.chapters})
        }else {
            alertify.alert('Error', res.errors);
        }

    }
    
    onFileChange(e){
        let files = e.target.files
        if(files && files.length){
            let fr = new FileReader()
            
            fr.onload = function(){
                document.getElementById('hn_imagen_chapter').src = fr.result
            }

            fr.readAsDataURL(files[0])
        }
    }


    render() { 
        const {chapter,duration}  = this.state

        return (
             <form onSubmit={this.onSave} method="post" id="form_hn_chapter">
                <div className="row">
                    <div className="col-xl-8">
                        <Input label="Chapter">
                            <input name="chapter" value={chapter} onChange={this.onChange} type="text" className='form-control' />
                        </Input>
                        <Input label="Duration" margin="true">
                            <input name="duration" value={duration} onChange={this.onChange}  type="text" className='form-control' />
                        </Input>
                        <Input label="File" margin="true">
                            <input onChange={this.onFileChange} name="imagen" type="file"  className='form-control-file' />
                        </Input>
                    </div>
                    <div className="col-xl-4">
                        <div className="text-center mb-2">
                            <img  alt="Imagen manga" id="hn_imagen_chapter" className='img-thumbnail comic-img' 
                                src="https://e.rpp-noticias.io/normal/2020/10/09/133613_1007593.jpg"
                                height={500}
                            />
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
 
export default HnChapterAdd;