import React from 'react';
import Modal from 'react-modal';
import {customModalStyle} from "../modalStyles";
import {Spinner} from "../../Spinner/Spinner";

//	todo need add validation
class CallMeModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: ''
		}
	}

	onChangeName = ({target}) => this.setState({name: target.value});

	onChangePhone = ({target}) => this.setState({phone: target.value});

	onDispatch = e => {
		e.preventDefault();
		this.props.onDispatch({name: this.state.name, phone: this.state.phone});
	};

	onClose = () => this.props.onClose();

	render() {
		return (
			<Modal isOpen={this.props.isOpen}
				   onRequestClose={this.onClose}
				   style={customModalStyle}
				   shouldCloseOnEsc={true}>
				<div className="text-center">
					<h3>Зателефонуй мені</h3>
				</div>
				<hr/>
				{!this.props.loading ? <form onSubmit={this.onDispatch}>
					<div className="form-container">
						<div className="form-group">
							<label htmlFor="inputName">Ім'я</label>
							<input type="text"
								   className={`form-control`}
								   id="inputName"
								   placeholder="Введіть своє ім'я"
								   onChange={this.onChangeName}/>
						</div>
						<div className="form-group">
							<label htmlFor="inputPhone">Номер телефону</label>
							<input type="text"
								   className={`form-control`}
								   id="inputPhone"
								   placeholder="Введіть свій номер телефону"
								   onChange={this.onChangePhone}/>
						</div>
						<div className="form-container__footer">
							<button type="submit" className="btn btn-primary">Відправити
							</button>
							<button className="btn btn-danger" onClick={this.onClose}>Закрити</button>
						</div>
					</div>
				</form> : <Spinner/>}
			</Modal>
		);
	}
}

export default CallMeModal;