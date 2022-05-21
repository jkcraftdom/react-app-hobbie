import {Component} from 'react'
import PropTypes from 'prop-types'

class ModalMultiple extends Component {

    constructor(props){
        super(props)

        this.onHide= this.onHide.bind(this)
    }

     static propTypes  = {
        children: PropTypes.instanceOf(Array).isRequired,
    }

    state = {  }

    onHide = () => {
        this.props.hide()
    }


    render() { 
        const {title, id, activeBody} = this.props

        return ( 
            <div className="modal" tabIndex="-1" role="dialog" id={id} data-backdrop="static">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button onClick={this.onHide} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {this.props.children.map(child => {     
                                if(child.props.label  !== activeBody)
                                    return undefined
                                return child                  
                            })}
                        </div>
                    </div>
                </div>                
            </div>
         );
    }
}
 
export default ModalMultiple;