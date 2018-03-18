import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../modalStyles";

class RegisterModal extends React.Component {
	constructor(props) {
		super(props);
	}

	closeModal = () => {
		this.props.closeModal();
	};

	render() {
		return (
			<Modal isOpen={this.props.isModalOpen}
				   onRequestClose={this.closeModal}
				   style={customStyles}>
				<div className="form-container">
					<div className="form-group">
						<label htmlFor="exampleInputEmail1">Email або логін</label>
						<input type="email" className="form-control" id="exampleInputEmail1"
							   aria-describedby="emailHelp" placeholder="Введіть email"/>
						<small id="emailHelp" className="form-text text-muted">We'll never share your email with
							anyone else.
						</small>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Пароль</label>
						<input type="password" className="form-control" id="exampleInputPassword1"
							   placeholder="Введіть пароль..."/>
					</div>
					<div className="form-check">
						<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
						<label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
					<button onClick={this.closeModal}>Close</button>
				</div>
			</Modal>
		);
	}
}

export default RegisterModal;