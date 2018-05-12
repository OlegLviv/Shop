import React from 'react';
import {AlertModal} from "../../../../common/AlertModal/AlertModal";

export const SuccessUpdatedUserDataModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Оновлення даних користувача"
					subjectText="Успішно"
					body="Дані користувача успішно оновлено"
		/>
	)
};