import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Notes from '../../Notes';

export default class Notebook extends React.Component {
	state  = {
		notebooks: [],
		notes:[],
		notebook: null
	}

	async componentDidMount(){
		const res = await fetch('http://127.0.0.1:8000/api/notebooks')
		const data = await res.json()
		this.setState({notebooks:data})
	}

	async onClick(e) {
		e.preventDefault()
		const res = await fetch('http://127.0.0.1:8000/api/login',
		{
			method: 'POST',			
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json'
			},
			body:  JSON.stringify({
				email: 'jkcraftdom@gmail.com',
				password: 'S0p0rt3web'
			})
		})
		const data = await res.json()
		console.log(data)

	}

	async onNotesClick(notebook){
		this.setState({notebook:notebook})
		const res = await fetch(`http://127.0.0.1:8000/api/notebooks/${notebook.id}/notes`)
		const data = await res.json()
		this.setState({notes:data})
		
	}

	render() {
		return (
			<Row>
				<h2 className="App"> Notebooks</h2>
				<Col xs={1}>
					<button type="button" className="btn btn-secondary" onClick={this.onClick}>Login</button>
				</Col>
				<Col xs={5}>
					<h3>Cantidad notebooks: {this.state.notebooks.length}</h3>
					<ListGroup>
						{this.state.notebooks.map(notebook =>
							<ListGroup.Item variant="primary" key={notebook.id} 
								action onClick={this.onNotesClick.bind(this, notebook)}>
								{notebook.title} - {notebook.cantidad} - {notebook.created_at}
							</ListGroup.Item>
						)}		
					</ListGroup>
				</Col>
				<Col xs={5}>

					<Notes notebook={this.state.notebook} 
						notes={this.state.notes} 
						books={this.state.notebooks}					
					/>
				</Col>
			</Row>
		)
	}
}