import { Component } from 'react';
import ModalBootstrap from '../Global/ModalBootstrap'
import InputGroup from '../../Atomics/InputGroup'
import ScanlationApi from '../../../Servicios/ScanlationApi'
import AsyncSelect from 'react-select/async'
import global from '../../../Funciones/global'

class ScanlationManage extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeScanlation = this.onChangeScanlation.bind(this)
    }

    state = { 
        scanlation: null,
        from_chapter: '',
        release: global.now(),
    }

    // Methods
    loadOptions(inputvalue, callback){

        if(inputvalue.length <=4){
            callback([])
            return
        }

        ScanlationApi.search(inputvalue)
            .then(res => {
                callback(res.data.scanlations)
            })
        
    }

    // Events
    async onSubmit(e){
        e.preventDefault()

        try{
            let data = new FormData(document.getElementById("form_scanlation"))

            data.append('scanlation', this.state.scanlation?.value)

            let res = await ScanlationApi.save(data, this.props.comic).then(x => x)
    
            console.log(res)

        }catch(ex){
            console.log(ex)
        }

    }

    // Child Event
    onChangeScanlation(selectedOptions){
        this.setState({
            scanlation: selectedOptions
        })
    }

    render() { 

        const {release} = this.state

        return (  
            <ModalBootstrap id="modal_scanlation" title="Create Scanlation">
                <form id="form_scanlation" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-xl-6">
                            <InputGroup label="Scanlation">
                                <AsyncSelect loadOptions={this.loadOptions}
                                    defaultOptions
                                    cacheOptions
                                    onChange={this.onChangeScanlation}                                
                                />
                            </InputGroup>
                        </div>
                        <div className="col-xl-6">
                            <InputGroup label="From chapter">
                                <input name="from_chapter" type="text" className="form-control" />
                            </InputGroup>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-xl-6">
                            <InputGroup label="Release">
                                <input name="release" type="text" className="form-control" defaultValue={release}/>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-2 offset-xl-10">
                            <button type="button" className="btn btn-sm btn secondary me-2">Back</button>
                            <button className="btn btn-sm btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </ModalBootstrap>
        );
    }
}
 
export default ScanlationManage;