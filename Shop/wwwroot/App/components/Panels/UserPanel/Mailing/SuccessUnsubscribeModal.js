import React from 'react';
import {AlertModal} from "../../../common/AlertModal/AlertModal";

export const SuccessUnsubscribeModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Відписка на розсилку"
					subjectText="Успішно"
					body="Ви успішно відписались на розсилку новинок та акційних пропозицій"
		/>
	)
};