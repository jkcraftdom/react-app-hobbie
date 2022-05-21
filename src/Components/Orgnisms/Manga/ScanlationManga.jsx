import {Component} from 'react'
import HeaderCard from '../../Molecules/Global/HeaderCard'
import TableBootstrap from '../../Atomics/TableBootstrap';
import ScanlationManage from '../../Molecules/Manga/ScanlationManage';
import {Modal} from 'bootstrap'


class ScanlationManga extends Component {
    constructor(props) {
        super(props);

        this.onCreate = this.onCreate.bind(this)
    }
    state = {  }

    onCreate = () => {
        new Modal("#modal_scanlation").show()
    }

    render() { 
        const {scanlations, comic} = this.props

        return (  
            <div className="card-body">
                <HeaderCard title="Scanlations">
                    <button onClick={this.onCreate} className='btn btn-sm btn-primary'>Create</button>
                </HeaderCard>                
                <TableBootstrap columns={['Scanlation', 'From chapter', 'Release']}>
                    {scanlations.map(scanlation => 
                        <tr key={scanlation.id}>
                            <td>{scanlation.scanlation.name}</td>
                            <td>{scanlation.from_chapter}</td>
                            <td>{scanlation.release}</td>
                        </tr>    
                    )}
                </TableBootstrap>
                <ScanlationManage comic={comic}/>
            </div>
        );
    }
}
 
export default ScanlationManga;