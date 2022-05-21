import {Component} from 'react'
import alertify from 'alertifyjs';
import Global from '../../../Funciones/global'
import CardBootstrap from '../../Atomics/CardBootstrap';
import InputGroup from '../../Atomics/InputGroup'
import CheckBox from '../../Atomics/CheckBox';

class MangaImagen extends Component {
    constructor(props) {
        super(props);

        this.state = {
          characters: [],
          isReal: true,
          isCensured: false,
          inProcess: false,
        }

        this.imagenDefault = "https://e.rpp-noticias.io/normal/2020/10/09/133613_1007593.jpg"

        this.onCopyImagen = this.onCopyImagen.bind(this)
        this.onSaveImagen = this.onSaveImagen.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onChangeCharacter = this.onChangeCharacter.bind(this)
    }
    
    // Events

    onChangeCharacter(e){
      let characterId = e.target.value
      if(characterId === "0") 
        return

      let character = this.props.characters.find(x => x.id == characterId)
      document.getElementById('img_character').src = character.imagen

    }

    async onCopyImagen(){
        
        let imagen = await Global.copyImagen().then(x => x)

        var imgElem = document.getElementById('ga_imagen')

        imgElem.src = imagen;
    }

    async onSaveImagen(e){

      e.preventDefault()

      const {isCensured,isReal} = this.state
      
      var form = new FormData(document.getElementById("form_gallery"))
      var imagen = await Global.getBlobImagen(document.getElementById("ga_imagen").src).then(x=>x)

      form.append('is_censured', isCensured === true? 1: 0)
      form.append('is_real', isReal === true? 1: 0)
      form.append('imagen', imagen)
     
      this.setState({inProcess: true})

      let data = await fetch(`http://127.0.0.1:8000/api/comic/${this.props.manga}/gallery`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',          
        },
        body: form
      }).then(res => res.status !== 200 ? "error": res.json())
        .catch(e =>{
          console.log(e)
          return 'error'
        })

      this.setState({inProcess: false})
      
      if(data === 'error'){
        alertify.alert("Galery", "Error")
        return
      }

      alertify.alert("Galery", data.response)

      this.props.onPostSave(data.galleries, data.total)
    }

    onChange(e){
      //console.log(e.target.type)
      this.setState({[e.target.name]: e.target.checked})
    } 

    render() { 
        const {manga, characters} = this.props
        const {isReal, isCensured, inProcess} = this.state

        return ( 
          <CardBootstrap>                                       
            <h5 className="card-title text-center bg-primary pb-1 text-light ">Galery</h5>
            <form id="form_gallery" onSubmit={this.onSaveImagen}>            
              <div className="row">
                <div className="col-xl-8">
                  <div className="text-center mb-2">
                    <img type='image' name="imagen" alt="Imagen manga" id="ga_imagen" className='img-thumbnail gallery-img' src={this.imagenDefault}/>
                  </div>
                </div>             
                <div className="col-xl-4">
                  <p className='text-center mb-1'><strong>Options</strong></p>
                  <CheckBox label="Is Censured" chkId="chk_censure">
                    <input onChange={this.onChange} checked={isCensured} name="isCensured" className="form-check-input" type="checkbox" id="chk_censure"/>
                  </CheckBox>   
                  <CheckBox label="Is real" chkId="chk_real">
                    <input onChange={this.onChange} checked={isReal} name="isReal" className="form-check-input" type="checkbox" id="chk_real"/>
                  </CheckBox>  
                  <p className='text-center mb-1'>Character</p>
                  <img alt='character' id="img_character" className='img-thumbnail character-img-preview' src={this.imagenDefault}/>
                </div>
              </div>
                                      
              <div className="row mb-2 mt-2">
                  <div className="col-xl-5">
                    <InputGroup label="Desc" small>
                      <input name="description" type="text" className="form-control"/>
                    </InputGroup>
                  </div>
                  <div className="col-xl-7">
                    <InputGroup label="Character" small>
                      <select className='form-control' name="character" onChange={this.onChangeCharacter}>
                        <option value="0">Escoger ...</option>
                        {
                          characters.map(character => 
                            <option value={character.id} key={character.id}>{character.name}</option> 
                        )}                    
                      </select>
                    </InputGroup>
                  </div>
              </div>
              <div className="row">
                  <div className="col-xl-6 d-grid">
                      <button type="button" onClick={this.onCopyImagen} className='btn btn-secondary  btn-sm'>
                        Copy
                      </button>
                  </div>
                  <div className="col-xl-6 d-grid">
                      <button className='btn btn-primary btn-sm' disabled={manga === null || inProcess == true}>
                        Save                      
                      </button>
                  </div>                                                                               
              </div>
            </form>
            </CardBootstrap>  
         );
    }
}
 
export default MangaImagen;