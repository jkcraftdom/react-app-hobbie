import {Component} from 'react'
import CardBootstrap from '../../Atomics/CardBootstrap';


class MangaShowGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            galleries: []
        }
    }

    componentDidMount(){
        this.setState({galleries: this.props.galleries})
    }
    componentDidUpdate(prevProps){
        if (this.props.galleries !== prevProps.galleries) {
            this.setState({galleries: this.props.galleries})
        }
    }
    
    render() { 
        const {total} = this.props

        const {galleries} = this.state
        let classInit = galleries.length === 0 ? 'carousel-inner carousel-heigth' : 'carousel-inner'

        return (             
            <CardBootstrap>
                <h5 className="card-title text-center">Galleries ({galleries.length} / {total})</h5>
                <div id="carousel-gallery" className="carousel slide mb-2">
                    <div className={classInit}>
                        {
                            galleries.map((gallery, index) => 
                                <div className={index === 0? "carousel-item active": 'carousel-item'}
                                        key={gallery.id}>
                                    <figure className="figure figure-carrosel">
                                        <img src={gallery.imagen} className="comic-img-carrosel rounded" alt=""/>
                                        <figcaption className="figure-caption text-center bg-secondary text-light font-weight-bold pb-1">
                                            <p className='mb-1'>Figure {index + 1}: {gallery.description}</p>
                                            <p className='mb-1'>
                                                <span className='badge bg-info  me-2'>Is real {gallery.is_real? "yes": "no"}</span>
                                                <span className='badge bg-info'>Is censured {gallery.is_censured? "yes": "no"}</span>
                                            </p>
                                        </figcaption>
                                    </figure>
                                </div>
                            )
                        }
                    </div>
                    <a className="carousel-control-prev" href="#carousel-gallery" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon bg-secondary" aria-hidden="true"></span>
                    </a>
                    <a className="carousel-control-next" href="#carousel-gallery" role="button" data-slide="next">
                        <span className="carousel-control-next-icon bg-secondary" aria-hidden="true"></span>
                    </a>
                </div>
            </CardBootstrap>
         );
    }
}
 
export default MangaShowGallery;