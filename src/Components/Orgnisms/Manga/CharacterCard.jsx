import {Component} from 'react'
import HeaderCard from '../../Molecules/Global/HeaderCard'
import {Modal} from 'bootstrap'
import CharacterState from './CharacterState'
import CharacterCreate from '../../Molecules/Manga/CharacterCreate'
import ShowCharacters from '../../Molecules/Manga/ShowCharacters'
import ModalMultiple from '../../Molecules/Global/ModalMultiple'
import './manga.css'
import CharacterApi from '../../../Servicios/CharacterApi'

class  CharacterCard extends Component {

    constructor(props){

        super(props)

        this.state = {
            characterSelect: null,
            activeBody: '',
            titleModal: ''      
        }

        this.columns = ['Character', 'Actions']
        this.modal = null
       
        
        this.onEventShow = this.onEventShow.bind(this)
        this.onCreate = this.onCreate.bind(this)
        this.onEventCreate = this.onEventCreate.bind(this)
        this.onPaginate = this.onPaginate.bind(this)
        this.onHideModal = this.onHideModal.bind(this)
        this.onSearch = this.onSearch.bind(this)


        
    }

    componentDidMount(){

        this.modal = new Modal('#modal_character',{
            backdrop:'static'
        })

    }

    // Events
    async onSearch(){
        let search = document.getElementById("txt_search").value 

        let response = await CharacterApi.search(search, this.props.data.comicId)
            .then(res => res.data)

        this.props.postSave({characters:response} )
    }

    onPaginate(modo){
        this.props.paginate(modo)
    }

    onCreate(){
        this.setState({activeBody: "create", titleModal: 'Create new character'})
        
        this.modal.show()
    }

    // Event Child
    onHideModal(){
        const {activeBody} = this.state
        if(activeBody === "state"){
            this.setState({characterSelect: null})
        }
    }

    onEventShow(tag, character){

        this.setState({
            characterSelect: character,
            activeBody: tag,
            titleModal: `Character ${character.name}`
        })

        this.modal.show()

    }

    onEventCreate(tag, data){
        const {charactersTotal, characters} = data
        
        this.props.postSave({charactersTotal, characters} )
    }

    render() { 

        const {comicId, characters} = this.props.data

        const {characterSelect, activeBody, titleModal} = this.state

        return (
            <div className="card-body">
                <HeaderCard title="Characters">
                    <div className="float-end">
                        <button onClick={this.onCreate} className='btn btn-sm btn-primary'>Create</button> 
                    </div>                                       
                </HeaderCard>              
                <ModalMultiple title={titleModal} activeBody={activeBody} id="modal_character" hide={this.onHideModal}>
                    <CharacterState label="state" character={characterSelect}/>
                    <CharacterCreate label="create" event={this.onEventCreate} characterSelect={characterSelect} manga={comicId}/>
                </ModalMultiple>
                                
                <div className="row">
                    <div className="col-xl-3 pt-1">
                        <span className=''>Total {characters.data.length} / {characters.total}</span>
                    </div>
                    <div className="col-xl-9">
                        <div className="input-group">
                            <input id="txt_search" type="text" className="form-control form-control-sm" placeholder='Search character' />
                            <button onClick={this.onSearch} className="btn btn-outline-secondary btn-sm">Search</button>
                        </div>
                        
                    </div>
                </div>
                <hr></hr>
                <ShowCharacters characters={characters.data} event={this.onEventShow}></ShowCharacters>
                <div className="row">
                    <div className="col-xl-12 text-center">
                        <button onClick={()=>this.onPaginate("previous")} 
                            type="button" className="btn btn-primary btn-sm me-3"
                            disabled={characters.prev_page_url? false:true}
                            >
                            Anterior
                        </button>
                        <button onClick={()=>this.onPaginate("next")} 
                            className="btn btn-primary btn-sm"
                            disabled={characters.next_page_url? false:true}
                            >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default CharacterCard;