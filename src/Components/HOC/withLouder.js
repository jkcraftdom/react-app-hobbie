import {Component} from 'react'
import MiniLoader from '../Atomics/MiniLoader'

const withLoader = (propValue, colspan)=>(WrapperComponent) => {
    
    return class WithLoader extends Component{

        render(){
            const mensaje = this.props['isQuery'] ? 'Sin registros': <MiniLoader/>

            return this.props[propValue].length === 0
                ?  <tfoot>
                    <tr className='table-active'>
                        <td colSpan={colspan} className="text-center">{mensaje}</td>
                    </tr>
                </tfoot>
            :<WrapperComponent {...this.props} />
        }

    }
}

export default withLoader