import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import parse from 'html-react-parser';
import alertify from 'alertifyjs';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import _ from 'lodash'

class Notes extends React.Component {
	

	state = {
		show: false,
		note: {title: '', content: '', created_at: ''},
		notebooksCurrent: [],
		moveTo: '',
		order: 'desc',
		notesCurrent: []
	}

	handleClose = () => { 
		this.setState({show:false})
	}

	handleShow (note) {

		var index = this.props.books.findIndex(n => n.id === note.note_book_id)
		var copyArray = [...this.props.books]
		copyArray.splice(index, 1)
		this.setState({show:true, note: note, notebooksCurrent: copyArray})

	}

	handleChange(event){
		this.setState({moveTo: event.target.value})
	}

	onClickOrder = () => {		
		if(this.state.order === 'desc'){
			this.setState({order: 'asc'})
		}else {
			this.setState({order: 'desc'})
		}

		this.setState({notesCurrent: _.orderBy(this.state.notesCurrent,
			['title'],
			[this.state.order])})
	}

	async moverNote(e){
		e.preventDefault()

		const res = await fetch(`http://127.0.0.1:8000/api/note/${this.state.note.id}/move`,
		{
			method: 'PUT',			
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json'
			},
			body:  JSON.stringify({
				moveto: this.state.moveTo
			})
		})
		const data = await res.json()
		alertify.alert("Completado!")
		console.log(data);
	}

	componentDidUpdate(prevProps){
		if(prevProps.notes !== this.props.notes)
		{
			this.setState({notesCurrent: prevProps.notes})
		}
	}
	render() {

		var title =  ''
		var count =  0
		var noteCurrent = this.state.note		

		if(this.props.notebook)
		{
			title = this.props.notebook.title
			count = this.props.notes.length
		}
 

		return (
			<div>
				<h3>Notebook: {title} (notes:  {count})</h3>
				<ButtonGroup>
					<Button variant="secondary" onClick={this.onClickOrder}>
						{this.state.order.toUpperCase()}
					</Button>
				</ButtonGroup>
				<ListGroup>
					{this.state.notesCurrent.map(note =>
						<ListGroup.Item variant="secondary" key={note.id} 
							action onClick={this.handleShow.bind(this,note)}>
							{note.title}
						</ListGroup.Item>
					)}
				</ListGroup>
				<Modal show={this.state.show} 
					onHide={this.handleClose}
					backdrop="static"
					size="lg">
					<Modal.Header closeButton>
						<Modal.Title>{noteCurrent.title}  (fecha creacion :{noteCurrent.date} {noteCurrent.time})</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col><b>Mover a </b></Col>
							<Col>								
								<select className="form-select" 
									value={this.state.moveTo} 
									onChange={this.handleChange.bind(this)}>
									<option value="-1">seleccione</option>
									{this.state.notebooksCurrent.map(n => 
										<option key={n.id} value={n.id}>{n.title}</option>
										)
									}				
								</select>
							</Col>
							<Col>
								<button className="btn btn-primary" onClick={this.moverNote.bind(this)}>ok</button>
							</Col>
						</Row>
						<div>{parse(noteCurrent.content?noteCurrent.content:'' )}</div>
					</Modal.Body>
				</Modal>
			</div>
		)
	}
}

export default Notes