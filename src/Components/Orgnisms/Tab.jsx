import {Component} from 'react'
import PropTypes from 'prop-types'


class Tab extends Component {

    static propTypes  = {
        children: PropTypes.instanceOf(Array).isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() { 
        return ( 
            <div className="card">
                {this.props.children.map(child => {     
                    if(child.props.label  !== this.props.activeTab)
                        return undefined
                    return child                  
                })}
            </div>
         );
    }
}
 
export default Tab;