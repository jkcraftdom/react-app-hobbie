import {Component} from 'react'
import Breacrumb from '../../Molecules/Global/Breadcrumb';
import ScInfo from '../../Orgnisms/Scanlation/ScInfo';
import CsWorks from '../../Orgnisms/Cosplayer/CsWorks';
import ModalBootstap from '../../Molecules/Global/ModalBootstrap';
import CsWorkAdd from '../../Orgnisms/Cosplayer/CsWorkAdd';
import laravel from '../../../Servicios/laravel';
import axios from 'axios';
import {Modal} from 'bootstrap'

class ScCreatePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeBody : "workAdd",
            scanlation: null,
            works: [],
            work: null,
        }

        this.onPostSave = this.onPostSave.bind(this)
        this.onEditWork = this.onEditWork.bind(this)
    }

    async componentDidMount(){
        
        const {id} = this.props.match.params

        if(id === undefined){
            return
        }

        const {scanlation, works} = await axios.get(laravel.makeUrl(`/scanlations/${id}`))
            .then(res=>res.data)

        this.setState({
            scanlation: scanlation,
            works: works
        })

        //document.getElementById('dj_modal').removeEventListener('show.bs.modal', this.showModal)
        //document.getElementById('dj_modal').addEventListener('show.bs.modal', this.showModal)

/*         $('#dj_modal').on('hidden.bs.modal', function (e) {
            console.log('cerrar')
        }) */
    }

    showModal(){
        console.log("modal")
    }

    onPostSave(data){
        this.setState({[data.name]:data.value})
    }

    onEditWork(work){
        this.setState({work: work})
        //document.getElementById('btn_modal').click()
        let modal = new Modal('#dj_modal')
        modal.show()        
    }
    
    render() { 
        const {activeBody, scanlation, works, work} = this.state 

        let nameBreacrumb = scanlation? scanlation.name : 'Create Scanlation'
        let nameWork = work? 'Work: '+ work.title: 'Work'

        return (             
            <>
                <div className="card mb-2 mt-2" >
                    <div className="card-body pb-0">
                        <div className='row'>                        
                            <div className='col-xl-6'>
                                <Breacrumb ruta="/scanlation" rutaName="Scanlation" actualName={nameBreacrumb}/>                                                        
                            </div>
                            <div className="col-xl-6">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-6">
                        <ScInfo postSave={this.onPostSave}/>
                    </div>
                    <div className="col-xl-6">
                        <CsWorks onEditWork={this.onEditWork} works={works}/>
                    </div>
                    <ModalBootstap activeBody={activeBody} title={nameWork}> 
                        <CsWorkAdd label="workAdd" work={work} scanlation={scanlation?.id} onPostSave={this.onPostSave}/>
                    </ModalBootstap>
                </div>
            </>

         );
    }
}
 
export default ScCreatePage;