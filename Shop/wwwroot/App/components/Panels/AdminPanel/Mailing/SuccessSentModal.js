import React from 'react';
import {AlertModal} from "../../../common/AlertModal/AlertModal";

export const SuccessSentModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Відправка повідомлення"
					subjectText="Успішно"
					body="Повідомлення успішно розіслано"
		/>
	)
};