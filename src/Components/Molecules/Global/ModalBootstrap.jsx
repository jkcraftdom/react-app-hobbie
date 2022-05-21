import {Component} from 'react'


class ModalBootstrap extends Component {

    render() { 
        const {title, id} = this.props
        let idModal = id? id : 'dj_modal'

        return ( 
            <div className="modal" tabIndex="-1" role="dialog" id={idModal}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>                
            </div>
         );
    }
}
 
export default ModalBootstrap;