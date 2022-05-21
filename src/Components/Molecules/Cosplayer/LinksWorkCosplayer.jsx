import TableBootstrap from '../../Atomics/TableBootstrap'
import {Component} from 'react'
import InputGroup from '../../Atomics/InputGroup'
import axios from 'axios';
import laravel from '../../../Servicios/laravel';
import alertify from 'alertifyjs';


class LinksWorkCosplayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            links: []
        }
        this.columns = ['Link', 'Origen', 'State', 'Created' ,'Expired']

        this.onSave = this.onSave.bind(this)

    }

    async onSave(e){
        e.preventDefault()
         
        let form = document.getElementById('form_cs_link_work')
        let data = new FormData(form)

        data.append('work', this.props.work)

        let response = await axios.post(laravel.makeUrl('/cs/work/links'), data).then(res => res.data)

        console.log(response)

        alertify.alert('Link', response.message)

        this.setState({links: response.links})

        
    }
    
    render() { 
        const {links} = this.state
        const {work} = this.props
        return ( <>
            <form id="form_cs_link_work" method='post' onSubmit={this.onSave}>
                <div className="row">
                    <div className="col-xl-7">
                        <InputGroup label="Link">
                            <input type="text" className="form-control" name="link" />
                        </InputGroup>
                    </div>
                    <div className="col-xl-3">
                        <InputGroup label="Origen">
                            <select name='origen' className='form-control'>
                                <option value="1">Telegram</option>
                                <option value="2">Website</option>
                            </select>
                        </InputGroup>
                    </div>
                    <div className="col-xl-2">
                        <button disabled={work === null}type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>
            <TableBootstrap columns={this.columns}>
                {
                    links.map(link => 
                        <tr key={link.id}>
                            <td>
                                <a href={link.link}>Link</a>
                            </td>
                            <td>{link.origen}</td>
                            <td>{link.created_at}</td>
                            <td>{link.expired}</td>
                        </tr>
                    )
                }
            </TableBootstrap>
        </> );
    }
}
 
export default LinksWorkCosplayer;