import {Component} from 'react'
import HeaderCard from '../../Molecules/Global/HeaderCard';
import InputGroup from '../../Atomics/InputGroup';
import axios from 'axios';
import Laravel from '../../../Servicios/laravel'
import alertify from 'alertifyjs';

class MarkdownChapter extends Component {
    constructor(props) {
        super(props);

        this.columns = ['Chapters', 'Actions']
        this.state  = { 
            chapter: 0,
            markdown: null,
            chapters: []
        }

        this.onSave = this.onSave.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    

    componentDidMount(){
        const {markdown} = this.props
        if(markdown){            
            let chapters = JSON.parse(markdown.chapters)
            this.setState({markdown:markdown, chapters: chapters})
        }

    }

    componentDidUpdate(prevProps){
        const {markdown} = this.props

        if(markdown !== prevProps.markdown){
            let chapters = JSON.parse(markdown.chapters)
            this.setState({markdown:markdown, chapters: chapters})
        }
    }


    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    async onSave(e){
        e.preventDefault()
        
        let response;
        const {markdown, chapter} = this.state

        if(markdown === null){            
            response = await this.create(this.props.comic, chapter)
        }else {           
            response = await this.update(markdown.id, chapter)
        }

        if(response){            
            alertify.alert('Markdown chapter', response.message)  

            let chapters = JSON.parse(response.markdown.chapters)
            
            this.setState({markdown: response.markdown, chapters: chapters})

        }
    }

    async create(comic, chapter){
        let response = await axios.post(Laravel.makeUrl('/markdown/chapter'), {
            comic: comic,
            chapter: chapter
        }).then(res => res.data)

        return response
    }

    async update(markdown, chapter){
        let response = await axios.put(Laravel.makeUrl('/markdown/chapter/'+markdown), {
            chapter: chapter
        }).then(res => res.data)

        return response 
    }

    render() { 

        const disabledButton = this.props.comic? false: true
        const {chapter, chapters} = this.state

        return ( 
            <div className='card-body'>
                <HeaderCard title="Markdown chapters">
                    <button disabled={disabledButton} onClick={this.onSave} className='btn btn-primary btn-sm'>Save</button>
                </HeaderCard>
                <form onSubmit={this.onSave}>
                    <div className="row mt-2">
                        <div className="col">
                            <InputGroup label="chapter">
                                <input name="chapter" onChange={this.onChange} value={chapter} type="text" className="form-control" />
                            </InputGroup>
                        </div>
                        <div className="col">
                            <div className="form-check mt-1">
                                <input className="form-check-input" type="checkbox" value="" id="mk_censure"/>
                                <label className="form-check-label" for="mk_censure">
                                    Censure
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
                <h6 className='card-title mt-2'>Chapters</h6>
                <div className="row row-cols-5">
                    {chapters.map((chapter,i)=>
                        <div className="col" key={i}>
                            <span className="badge bg-primary">
                                Cap: {chapter.chapter}
                                <button className='btn btn-link btn-sm text-white'>
                                    <i className="bi bi-x-circle"></i>
                                </button>
                            </span> 

                        </div>
                    )}
                </div>
            </div>
         );
    }
}
 
export default MarkdownChapter;
