import React from 'react'
import alertify from 'alertifyjs'

export default class FormularioEnlaces extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			enlace: '',
			categoria: '',
			enlaces: [],
			id: ''
		}

		this.onGuardar = this.onGuardar.bind(this)
		
	}

	async componentDidMount()
	{
		const res = await fetch('http://127.0.0.1:8000/api/enlace')
		const data = await res.json()
		this.setState({enlaces: data.enlaces})
	}

	async onGuardar(e){
		e.preventDefault()
		
		var method = 'POST'
		var http = 'http://127.0.0.1:8000/api/enlace'
		if(this.state.id){
			method = 'PUT'
			http = http + "/" + this.state.id
		}

		const res = await fetch(http,
		{
			method: method,			
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json'
			},
			body:  JSON.stringify({
				enlace: this.state.enlace,
				categoria: this.state.categoria
			})
		})
		const data = await res.json()

		if(data.success){
			this.setState({
				enlaces: data.enlaces,
				id: '',
				enlace: '',
				categoria: ''
			})
			alertify.alert("Procesamiento","Completado!")

		}else{
			console.log(data);
		}
		
		
	}

	onActualizar(item){
		this.setState({
			enlace: item.enlace,
			categoria: item.categoria,
			id: item.id
		})
	}

	categoriaName(cat){
		const names = ['','manga','anime']
		return names[cat]
	}
	render() {
		return (
			<div className="card">				
				<form action="" className='card-body'>
					<h5 className='card-title'>Formulario</h5>
					<div className="mb-3">
						<label  className="form-label" htmlFor="inputEnlace">Enlace</label>		
						<input type="text" className="form-control" id="inputEnlace"
							onChange={e => this.setState({enlace:e.target.value})}
							value={this.state.enlace}
						/>						
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="inputCategoria" >Categoria</label>
						<select className="form-control" id="inputCategoria" 
							onChange={e => this.setState({categoria:e.target.value})}
							value={this.state.categoria}
							>
							<option value="-1">Seleccione</option>
							<option value="1">Manga</option>
							<option value="2">Anime</option>
						</select>				
					</div>
					<div className="mb-3">
						<button className="btn btn-primary" onClick={this.onGuardar}>Guardar</button>
						<p>{this.state.enlace} - {this.state.categoria}</p>
					</div>
				</form>
				{this.state.enlaces.map(e=>(
					<p>
						<a href={e.enlace} target="_blank" rel="noreferrer" >{e.enlace}</a>
					 	<span>({this.categoriaName(e.categoria)})</span>
					 	<button onClick={this.onActualizar.bind(this,e)}
					 		className="btn btn-secondary"
					 	> Actualizar</button>
					</p> 
					))}
			</div>
		)
	}
}