import {Component} from 'react'
import InputGroup from '../../Atomics/InputGroup'
import global from '../../../Funciones/global'
import laravel from '../../../Servicios/laravel'
import alertify from 'alertifyjs'

class CharacterCreate extends Component {

    constructor(props) {

        super(props);

        this.onSave = this.onSave.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.dataCharacter = this.dataCharacter.bind(this)
        this.imagen = "https://e.rpp-noticias.io/normal/2020/10/09/133613_1007593.jpg"
    }

    state = { 
        modoCreate: true
    }

    componentDidUpdate(prevProps){

        const {characterSelect} = this.props

        if(characterSelect !== prevProps.characterSelect){
            if(characterSelect == null)
                return   

            console.log("edit")   

            document.getElementById('chr_imagen').src = characterSelect.imagen

            var form = document.getElementById('formCharacter')
            form.elements['name'].value = characterSelect.name
            form.elements['chapter'].value = characterSelect.appear_chapter

            this.setState({modoCreate: false})
        }

    }

    // Methods

    dataCharacter(items = null){
        let data = new FormData(document.getElementById('formCharacter'))        

        if(items == null)
            return data
        
        Object.entries(items).forEach(entry => {
            const [key, value] = entry;
            data.append(key, value)
        });

        return data
    }

    limpiar(){
        document.getElementById('chr_imagen').src = this.imagen

        var form = document.getElementById('formCharacter')

        form.elements['name'].value = ""
        form.elements['chapter'].value = ""

        this.setState({characterSelect: null})
    }

    // Events
    async onFocusName(){
        document.getElementById('chr_imagen').src = await global.copyImagen().then(x=>x)
    }

    onChangeName(e){
        let text = e.target.value
        let sText = text.split(' ')

        let newText = sText.map( t => {
            let aux = t.toLowerCase()
            let res = aux.charAt(0).toUpperCase() + aux.slice(1)
            return res
        })

        e.target.value = newText.join(" ")
    }
    async onPasteImagen(){
        document.getElementById('chr_imagen').src = await global.copyImagen().then(x=>x)
    }

    async saveCharacter(){

        let imagen = await global.getBlobImagen(document.getElementById('chr_imagen').src)
            .then(x=>x)

        let items = {
            comic: this.props.manga,
            imagen: imagen
        }

        let data = this.dataCharacter(items)        
        

        const response = await laravel.axiosInstance.post('characters',data, {
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
            }).then(res => res.data)
            .catch(x =>{
                console.log(x)
                return "error"
            })

        return response
    }

    async updateCharacter(){

        let data = this.dataCharacter()
        
        const {characterSelect} = this.props

        const response = await laravel.axiosInstance
            .post(`/characters/${characterSelect.id}?_method=PUT`,
            data, 
            {
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'multipart/form-data'
                }
            })
            .then(res => res.data)
            .catch(x =>{
                console.log(x)
                return "error"
            })

        return response
    }

    async onSave(e){

        e.preventDefault()

        const {characterSelect} = this.props

        let response = characterSelect? await this.updateCharacter() : await this.saveCharacter()

        if(response === "error" ){
            alertify.alert('Character', "Error")
            return
        }
            
        this.limpiar() 

        this.props.event('create', {
            characters: response.characters,
            charactersTotal: response.character_total
        })
        
    }

    render() { 
        const {manga} = this.props
        let buttonName = this.state.modoCreate? "Save": "Update"
        return (                
            <form onSubmit={this.onSave} id="formCharacter">
                <div className="row mt-2 mb-2">
                    <div className="col-xl-6">   
                        <InputGroup label="Name">
                            <input onChange={this.onChangeName} 
                                onFocus={this.onFocusName}
                                type="text"  name="name" className='form-control form-control-sm'
                            />
                        </InputGroup>   
                        <InputGroup label="Genero" margin>
                            <select name="genero" className="form-control form-control-sm">   
                                <option value="1">Femenino</option>
                                <option value="2">Masculino</option>
                            </select>
                        </InputGroup>   
                        <InputGroup label="Chapter" margin>
                            <input type="text"  name="chapter" className='form-control form-control-sm'/>
                        </InputGroup>                                             
                        <InputGroup label="State initial" margin>
                            <input type="text"  name="state" className='form-control form-control-sm'/>
                        </InputGroup>                                             
                    </div>
                    <div className="col-xl-6">
                        <div className="text-center mb-2">
                            <img  alt="Character" id="chr_imagen" className='img-thumbnail comic-img' src="https://e.rpp-noticias.io/normal/2020/10/09/133613_1007593.jpg"/>
                        </div>   
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-4 offset-xl-8">
                        <button type='button' onClick={this.onPasteImagen} className='btn btn-sm btn-secondary me-2'>Copy imagen</button>
                        <button className="btn btn-primary btn-sm " onClick={this.onSave} disabled={manga === null }>{buttonName}</button>
                    </div>
                </div>
            </form> 
            );
    }
}
 
export default CharacterCreate;