import React from 'react';
import Modal from 'react-modal';
import {customModalStyle} from "../modalStyles";

class SuccessRegisterModal extends React.Component {
	constructor(props) {
		super(props);
	}

	closeModal = () => {
		this.props.onCloseModal();
	};

	render() {
		return (
			<Modal
				isOpen={true}
				onRequestClose={this.closeModal}
				style={customModalStyle}>
				<h3>Успішно</h3>
				<hr/>
				<h6>На вашу пошту надіслано повідомнення для підтвердження вашого email</h6>
				<div className="text-center">
					<button className="btn btn-success btn-group-lg" onClick={this.closeModal}>OK</button>
				</div>
			</Modal>
		);
	}
}

export default SuccessRegisterModal;