import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../modalStyles";
import {Alert} from "../../common/Alert/Alert";

// todo maybe need will remove
export const AlertModal = (props) => {
	onCloseModal = () => {
		this.props.onCloseModal();
	};
	return (
		<Modal isOpen={this.props.isModalOpen}
			   onRequestClose={this.onCloseModal}
			   shouldCloseOnEsc={true}
			   style={customStyles}>
			<Alert />
		</Modal>
	);
};