import {Component} from 'react'
import HnInfo from '../../Orgnisms/Hentai/HnInfo';
import laravel from '../../../Servicios/laravel';
import axios from 'axios';
import HeaderPageChildren from '../../Molecules/Global/HeaderPageChildren'
import HnChapters from '../../Orgnisms/Hentai/HnChapters';
import HnChapterAdd from '../../Orgnisms/Hentai/HnChapterAdd';
import Modal from '../../Molecules/Global/ModalBootstrap'

class HnCreatePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeBody : "workAdd",
            hentai: null,
            chapters: []
        }

        this.headerConfig = {
            toBack: '/hentai',
            backName: 'Hentais'
        }

        this.onPostSave = this.onPostSave.bind(this)
    }

    async componentDidMount(){
        const {id} = this.props.match.params

        if(id === undefined){
            return
        }

        const {hentai} = await axios.get(laravel.makeUrl(`/hentais/${id}`)).then(res=>res.data)

        this.setState({
            hentai: hentai,
        })
    }

    onPostSave(data){
        this.setState({[data.name]:data.value})
    }
    
    render() { 
        const {activeBody, hentai, chapters} = this.state 

        let nameBreacrumb = hentai? hentai.name : 'Create Hentai'

        return (             
            <>
                <HeaderPageChildren headerConfig={this.headerConfig} name={nameBreacrumb} >
                </HeaderPageChildren>
                <div className="row">
                    <div className="col-xl-6">
                        <HnInfo postSave={this.onPostSave} hentai={hentai}/>
                    </div>
                    <div className="col-xl-6">
                        <HnChapters chapters={chapters}/>
                    </div>
                    <Modal activeBody={activeBody} title="Chapter"> 
                        <HnChapterAdd label="workAdd" hentai={hentai?.id} postSave={this.onPostSave}/>
                    </Modal>
                </div>
            </>

         );
    }
}
 
export default HnCreatePage;