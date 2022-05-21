import {Component} from 'react'
import InputGroup from '../../Atomics/InputGroup'
import TableBootstrap from '../../Atomics/TableBootstrap'
import Laravel from '../../../Servicios/laravel'


class CharacterState extends Component {
    constructor(props) {
        super(props);

        this.state = {
            states: []
        }
        
        this.columns = ['State', 'Description', 'Chapter']

        this.onSave = this.onSave.bind(this)
    }
    

    async componentDidUpdate(prevProps){

        const {character} = this.props

        if(character === null)
            return

        if(character !== prevProps.character){

            let response = await Laravel.axiosInstance.get('/character/states/'+character.id).then(res => res.data)

            this.setState({
                title: `Character states: ${character.name}`,
                states: response.states
            })

        }
        
    }

    // Events
    async onSave(e){
        
        e.preventDefault()

        let form = document.getElementById('frm_ch_state')

        let data = new FormData(form)

        data.append("character", this.props.character.id)
        
        let response = await Laravel.axiosInstance.post('/character/states',data,{
                headers: {
                    'Accept': 'Applcation/json',
                    'Content-Type': 'Application/json'
                }
            }).then(res => res.data)
        .catch(ex => {
            console.log(ex)
            return "error"
        })

        if(response === "error")
            return

        this.setState({states: response.states})

    }

    render() { 
        const {states} = this.state

        return ( 
            <>
                <form id="frm_ch_state">
                    <div className="row">
                        <div className="col-xl-4">
                            <InputGroup label="Name">
                                <input name="name" type="text" className='form-control' />
                            </InputGroup>
                        </div>
                        <div className="col-xl-6">
                            <InputGroup label="Description">
                                <input name="description" type="text" className="form-control" />
                            </InputGroup>
                        </div>
                        <div className="col-xl-2">
                            <button onClick={this.onSave} className="btn btn-primary" type='submit'>Save</button>
                        </div>
                        <div className="row mt-2">
                            <div className="col-xl-4">
                                <InputGroup label="Chapter">                                
                                    <input name="chapter" type="text" className="form-control" />
                                </InputGroup>
                            </div>
                        </div>                              
                    </div>
                </form>

                <TableBootstrap columns={this.columns}>
                    {states.map(state => 
                        <tr key={state.id}>
                            <td>{state.name}</td>
                            <td>{state.description}</td>
                            <td>{state.chapter}</td>
                        </tr>    
                    )}
                </TableBootstrap>
            </>
         );
    }
}
 
export default CharacterState;