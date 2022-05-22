import {Component} from 'react'
import Breacrumb from '../Molecules/Global/Breadcrumb';
import DjAuthor from '../Orgnisms/Doujinshi/DjAuthor';
import DjWorks from '../Orgnisms/Doujinshi/DjWorks';
import DjWorkAdd from '../Orgnisms/Doujinshi/DjWorkAdd';
import laravel from '../../Servicios/laravel';
import axios from 'axios';
import {setDoujin} from '../../Actions'
import {connect} from 'react-redux'
import Modal from '../Molecules/Global/ModalBootstrap'


const mapStateToProps = state => ({
    doujin: state.doujin
})

const mapDispatchToProps = dispatch =>({
    setDoujin: value => dispatch(setDoujin(value))
})

class DjCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeBody : "workAdd",
            author: null,
            works: []
        }

        this.onPostSave = this.onPostSave.bind(this)
    }

    async componentDidMount(){
        const {id} = this.props.match.params

        console.log('doujin', this.props.doujin)

        if(id === undefined){
            return
        }

        const {author, works} = await axios.get(laravel.makeUrl(`/authors/${id}`))
            .then(res=>res.data)
        this.setState({
            author: author,
            works: works
        })
        this.props.setDoujin(author)
    }

    onPostSave(data){
        this.setState({[data.name]:data.value})
    }
    
    render() { 
        const {activeBody, author, works} = this.state 

        let nameBreacrumb = author? author.name : 'Create Doujinshi'

        return (             
            <>
                <div className="card mb-2 mt-2" >
                    <div className="card-body pb-0">
                        <div className='row'>                        
                            <div className='col-xl-6'>
                                <Breacrumb ruta="/dj" rutaName="Doujinshi" actualName={nameBreacrumb}/>                                                        
                            </div>
                            <div className="col-xl-6">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-6">
                        <DjAuthor postSave={this.onPostSave}/>
                    </div>
                    <div className="col-xl-6">
                        <DjWorks works={works}/>
                    </div>
                    <Modal activeBody={activeBody} title="Work "> 
                        <DjWorkAdd label="workAdd" author={author?.id} postSave={this.onPostSave}/>
                    </Modal>
                </div>
            </>

         );
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(DjCreate);