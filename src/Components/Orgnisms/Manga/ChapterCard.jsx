import {Component} from 'react'
import DeleteButton from '../../Molecules/Global/DeleteButton'
import HeaderCard from '../../Molecules/Global/HeaderCard'
import InputGroup from '../../Atomics/InputGroup'

class  Chapters extends Component {

    constructor(props){
        super(props)
        this.state = {
            chapters: [],
            chaptersCreate:[],
            counterCreate: 0,        
        }

        this.onAddChapter = this.onAddChapter.bind(this)
        this.onPostDeleting = this.onPostDeleting.bind(this)
        this.onCreateChapter = this.onCreateChapter.bind(this)
    }



    componentDidMount(){        
        var today = new Date()
        var date = this.padNumero(today.getDate()) +'.'+this.padNumero(today.getMonth()+1)+'.' +today.getFullYear()
        
        document.getElementsByName('ch_date')[0].value = date

    }

    componentDidUpdate(prevProps) {
        if(this.props.chaptersCreate !== prevProps.chaptersCreate){
            this.setState({chaptersCreate: this.props.chaptersCreate})
        }
    }

    onAddChapter(e){

        e.preventDefault()
        
        var form = document.getElementById('formChapter')
        var language = form.elements['language'].value
        var chapter = form.elements['chapter'].value
        var date = form.elements['ch_date'].value
        var range = form.elements['range'].value
        var is_censured = form.elements['is_censured'].checked? 1 : 0
        //this.setState({chapters: [...this.state.chapters, {language,chapter, date}]})

        fetch(`http://127.0.0.1:8000/api/comic/${this.props.manga}/chapter`,{
            method: 'post',
            headers: {
                'Accept': 'Applcation/json',
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                language,
                chapter, 
                date, 
                range,
                is_censured
            })
        }).then(res => res.json())
        .then(res => {
            this.props.postSave({chapters:res.chapters})
        })
        .catch(e => console.log(e))


    }

    onCreateChapter(){

        const {counterCreate, chaptersCreate} = this.state

        if(counterCreate >= chaptersCreate.length){
            this.setState({'counterCreate': 0})
            return  
        }

        var txtDate = document.getElementsByName('ch_date')[0]
        var txtChapter = document.getElementsByName('chapter')[0]        
        var chapter = chaptersCreate[counterCreate]

        txtChapter.value = chapter.chapter
        txtDate.value = chapter.date
        this.setState({'counterCreate': counterCreate + 1})
    }

    padNumero(num){
        return String(num).padStart(2, '0')
    }

    onPostDeleting(res){   
        this.props.postSave({chapters: res.chapters})
    }

    getClassRange(range){

        let classRange = "bi bi-exclamation"
        if(range === null )
            return classRange
        
        switch(range){
            case 1:
                classRange = "bi bi-sort-up"
                break
            case 2: 
                classRange = "bi bi-sort-down"
                break
            case 3:
                classRange = "bi bi-check"
                break
        }
        return classRange
    }
    render() { 
        const {manga, chaptersCreate, chapters} = this.props
        const self = this
        const copyCreateHabilitado = chaptersCreate.length === 0 
        return (
            <div className="card-body">
                <HeaderCard title="Chapters">
                    <button className="btn btn-secondary btn-sm me-2" onClick={this.onCreateChapter} disabled={copyCreateHabilitado}>
                        Create ({ this.state.chaptersCreate.length})
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={this.onAddChapter} disabled={manga === null }>
                        Save
                    </button>
                </HeaderCard>              
                <form onSubmit={this.onAddChapter.bind(this)} id="formChapter">
                    <div className="row mt-2">
                        <div className="col-xl-4">
                            <InputGroup label="Chapter" small>
                                <input type="text"  name="chapter" className='form-control form-control-sm'/>
                            </InputGroup>                          
                        </div>
                        <div className="col-xl-4">
                            <InputGroup label="Lang" small>
                                <select name="language" className="form-control form-control-sm">   
                                    <option value="1">es</option>
                                    <option value="2">en</option>
                                    <option value="3">ja</option>
                                    <option value="4">kr</option>
                                    <option value="5">ch</option>
                                </select>                            
                            </InputGroup>                            
                        </div>
                        <div className="col-xl-4">
                            <InputGroup label="Date" small>
                                <input type="text" name="ch_date" className='form-control form-control-sm'/>
                            </InputGroup>
                        </div>

                    </div>
                    <div className='row mt-2'>  
                        <div className="col-xl-4">
                            <InputGroup label="Range" small>
                                <select name="range" className="form-control form-control-sm" defaultValue="2">   
                                    <option value="1">Start</option>
                                    <option value="2">End</option>
                                    <option value="3">Only</option>
                                </select>
                            </InputGroup>
                        </div>
                        <div className="col-xl-4">
                            <div className="form-check mt-1">
                                <input className="form-check-input" type="checkbox" id="chk_censure" name='is_censured'/>
                                <label className="form-check-label" htmlFor="chk_censure">
                                    Is censured?
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Chapter</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            chapters.map(chapter =>{
                                let classRange = self.getClassRange(chapter.range)
                                return (
                                <tr key={chapter.id}>                                
                                    <td>
                                        <span className='badge bg-primary'>
                                            {chapter.chapter}
                                        </span>
                                        <span className='badge bg-secondary ms-2'>
                                            {chapter.language_id}
                                        </span>
                                        <span className='badge bg-secondary ms-2'>
                                            {chapter.date}
                                        </span>
                                        <span className='badge bg-primary ms-2'>
                                            <i className={classRange}></i>
                                        </span>
                                    </td>
                                    <td>
                                        <DeleteButton url={`chapters/${chapter.id}`} onPostDeleting={this.onPostDeleting}></DeleteButton>
                                        <button className="btn btn-primary btn-sm ">
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                    </td>
                                </tr>   
                            )})
                        }

                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default Chapters;