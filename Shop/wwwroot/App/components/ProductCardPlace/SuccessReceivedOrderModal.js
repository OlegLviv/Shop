import React from 'react';
import {AlertModal} from "../common/AlertModal/AlertModal";

export const SuccessReceivedOrderModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Відправка замовлення"
					subjectText="Успішно"
					body="Замовлення успішно надіслано"
		/>
	)
};