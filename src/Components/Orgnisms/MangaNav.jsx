import {Component} from 'react'
import CardBootstrap from '../Atomics/CardBootstrap';

class MangaNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 'chapter'
        }
        this.onClick = this.onClick.bind(this)

        this.items = [
            {name: 'Chapters', tab: 'chapter', class_icon: 'bi bi-book-fill'},
            {name: 'Galery', tab: 'galery', class_icon: 'bi bi-file-earmark-image'},
            {name: 'Characters', tab: 'character', class_icon: 'bi bi-people-fill'},
            {name: 'Links', tab: 'link', class_icon: 'bi bi-link'},
            {name: 'Markdown', tab: 'markdown', class_icon: 'bi bi-bookmark-check-fill'},            
            {name: 'Names', tab: 'name', class_icon: 'bi bi-translate'},
            {name: 'Firebase', tab: 'Firebase', class_icon: 'bi bi-hdd-fill'},
            {name: 'Scanlations', tab: 'scanlation', class_icon: 'bi bi-hdd-fill'},
        ]
    }

    

    onClick(tabName){
        this.setState({tab: tabName})
        this.props.onActive(tabName)
    }

    render() { 
        
        return ( 
            <div className="col-xl-2">
                <CardBootstrap>
                    <ul className="nav flex-column nav-pills">
                        {
                            this.items.map((item,i) => 
                                <li className="nav-item" key={i}>
                                    <button className={this.state.tab === item.tab? 'nav-link active': 'nav-link' }
                                        onClick={()=>this.onClick(item.tab)}>
                                        <i className={item.class_icon}></i>
                                        <span className='ms-1'>{item.name}</span>
                                    </button>
                                </li>                                                                    
                            )
                        }

                    </ul>
                </CardBootstrap>
            </div>

       );
    }
}
 
export default MangaNav;