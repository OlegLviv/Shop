import React from 'react';
import {AlertModal} from "../../../common/AlertModal/AlertModal";

export const SuccessChangedPasswordModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Оновлення паролю"
					subjectText="Успішно"
					body="Пароль успішно оновлено"
		/>
	)
};