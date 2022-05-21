import {Component} from 'react'
import alertify from 'alertifyjs';

class DeleteButton extends Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this)
    }

    async onDelete(){
        let self = this
        alertify.confirm("Confirm","Sure you delete?",
        async function(){
            var data = await fetch('http://127.0.0.1:8000/api/'+self.props.url,{                
                method: 'delete',
                headers: {
                    'Accept': 'application/json'
                },
                body: JSON.stringify({'_method': 'DELETE'})
            }).then(res => res.json())
            
            alertify.success(data.response)            
            self.props.onPostDeleting(data)
            
        },
        function(){
            //
        });


    }
    
    
    render() { 
        return ( 
            <button onClick={this.onDelete} className="btn btn-danger btn-sm me-2">
                <i className="bi bi-trash"></i>
            </button>
         );
    }
}
 
export default DeleteButton;