import React from 'react';
import Modal from 'react-modal';
import {customModalStyle} from "../../Modal/modalStyles";
import './AlertModal.scss';

export const AlertModal = ({isOpen, onCloseAlertModal, headerText, subjectText, body}) => {

	const onCloseModal = () => {
		onCloseAlertModal();
	};

	return (
		<Modal isOpen={isOpen}
			   onRequestClose={onCloseModal}
			   shouldCloseOnEsc={true}
			   style={customModalStyle}>
			<div className="modal-body">
				<div className="modal-body__header">
					<h3>{headerText}</h3>
					<hr/>
				</div>
				<div className="modal-body__main">
					<div className="modal-body__main__subject">
						<h4>{subjectText}</h4>
					</div>
					<div className="modal-body__main__body">
						<h6>{body}</h6>
					</div>
				</div>
				<div className="modal-body__footer">
					<button className="btn btn-success"
							onClick={onCloseModal}>OK
					</button>
				</div>
			</div>
		</Modal>
	);
};