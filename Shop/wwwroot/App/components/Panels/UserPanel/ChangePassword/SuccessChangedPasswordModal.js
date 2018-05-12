import React from 'react';
import {AlertModal} from "../../../common/AlertModal/AlertModal";

export const SuccessChangedPasswordModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Зміна паролю"
					subjectText="Успішно"
					body="Пароль успішно змінено"
		/>
	)
};