import { Component } from 'react'
import alertify from 'alertifyjs'

class MangaDetailCard extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.onGuardar = this.onGuardar.bind(this)
       
    }

    async onGuardar(e) {
        e.preventDefault()
        var form = document.getElementById('formManga')
        var datos = new FormData(form)

        if(datos.get('madure') == null){
            datos.append('madure', 0)
        } else {
            datos.set('madure', 1)
        }
        
        const res = await fetch('http://127.0.0.1:8000/api/comics',
        {
			method: 'POST',			
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body: JSON.stringify(Object.fromEntries(datos)),
		})

		const data = await res.json()
        if(data.success){
		    alertify.alert('Created!')
            this.props.onCreated(data.id, data.comic)
        }else
            console.log('error')
        
    }

    componentDidMount(){
        if(this.props.comic){
            this.updateInterfaz()
        }
    }

    componentDidUpdate(prevProps) {
        // Uso tipico (no olvides de comparar las props):
        if (this.props.comic !== prevProps.comic) {
            this.updateInterfaz()
        }
    }

    updateInterfaz(){
        var txtName = document.getElementsByName('name')[0]
        var txtDate = document.getElementsByName('date')[0]
        var txtType = document.getElementsByName('type')[0]
        var txtMadure = document.getElementsByName('madure')[0]
        var txtSource = document.getElementsByName('source')[0]
        txtName.value = this.props.comic?.name?? ''
        txtDate.value = this.props.comic?.date??''
        txtType.value = this.props.comic?.type?? 1
        txtSource.value = this.props.comic?.source??1
        if(this.props.comic?.madure === 1)
        {
            txtMadure.click()
        }
    }



    render() {
        const {comic} = this.props
        return (
            <div className="card" >
                <div className="card-body">
                    <form id="formManga">
                        <div className="row">
                            <div className="col-xl-9">
                                <h5 className="card-title">Detail</h5>
                            </div>
                            <div className="col-xl-3">
                                
                                <button onClick={this.onGuardar} className='btn btn-primary btn-sm'>Guardar</button>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <label className="col-xl-2 col-form-label"><small>Name</small> </label>
                            <div className="col-xl-10">
                                <input name="name" 
                                    type="text" className='form-control form-control-sm' 
                                    readOnly={comic?true:false}/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <label className='col-xl-2 col-form-label'><small>Create date</small></label>
                            <div className="col-xl-4">
                                <input name="date" type="text" className='form-control form-control-sm' />
                            </div>
                            <label className="col-xl-2 col-form-label"><small>Status</small></label>
                            <div className="col-xl-4">
                                <select name="state" type="text" className="form-control form-control-sm">
                                    <option value="1">Progreso</option>
                                    <option value="2">Terminado</option>
                                    <option value="3">Hiatus</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <label className='col-xl-2 col-form-label'>
                                <small>Type</small>
                            </label>
                            <div className="col-xl-10">
                                <select name="type" id="" className="form-control form-control-sm">
                                    <option value="1">Manga</option>
                                    <option value="2">Manhua</option>
                                    <option value="3">Manwhua</option>
                                    <option value="4">Webtoon</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <label className="col-xl-2 col-form-label"><small>+18</small></label>
                            <div className="col-xl-10">
                                <input type="checkbox" name="madure" className='form-check-input' />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="" className="col-xl-2 col-form-label"><small>Source</small></label>
                            <div className="col-xl-10">
                                <select name="source" id="" className="form-control form-control-sm">
                                    <option value="1">Original</option>
                                    <option value="2">Novel</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default MangaDetailCard;