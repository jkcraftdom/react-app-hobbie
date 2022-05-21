import {Component} from 'react'
import DetailWorkCosplayer from '../../Molecules/Cosplayer/DetailWorkCosplayer';
import LinksWorkCosplayer from '../../Molecules/Cosplayer/LinksWorkCosplayer';

class CsWorkAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            work: null,
            links: []
        }

        this.onPostSave = this.onPostSave.bind(this)
        
    }

    componentDidMount(){

        const {work} = this.props

        if(work){
            this.setState({work: work})
        }
    }

    componentDidUpdate(prevProps){
        const {work} = this.props
        if(work !== prevProps.work){
            this.setState({work: work})
        }
    }

    onPostSave(work, works){
        this.setState({work: work})
        this.props.onPostSave({name: 'works', value: works})
    }

    render() { 
        const {work} = this.state
        
        return (
            <>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#detail"  role="tab" aria-controls="detail" aria-selected="true">Detail</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#links" role="tab" aria-controls="links" aria-selected="false" >Links</a>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane fade show active mt-2" id="detail" role="tabpanel" aria-labelledby="home-tab">
                    <DetailWorkCosplayer work={work} cosplayer={this.props.cosplayer} onPostSave={this.onPostSave}/>
                </div>
                <div className="tab-pane fade mt-2" id="links" role="tabpanel" aria-labelledby="profile-tab">
                    <LinksWorkCosplayer work={work?.id}/>
                </div>
            </div>
            </>
        );
    }
}
 
export default CsWorkAdd;