import { collection, getDocs } from "firebase/firestore";
import db from '../../../Servicios/Firebase'
import {Component} from 'react'

class MangaFirebase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comics: []
        }
        this.onConsultar = this.onConsultar.bind(this)
    }

     componentDidMount()
    {

    }

    async onConsultar(){
        const querySnapshot = await getDocs(collection(db, "comics"));
        //this.setState({comics: querySnapshot})
        console.log(querySnapshot.docs)
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    }
    render() { 
        return (
            <div className="card-body">
                <button className="btn btn-primary" onClick={this.onConsultar}>Consultar</button>
                <h5 className="card-title">Firebase</h5>
                <ul>
                    {this.state.comics.map(c => 
                        <li>{c.id}</li>
                    )}
                </ul>
            </div>
          );
    }
}
 
export default MangaFirebase;