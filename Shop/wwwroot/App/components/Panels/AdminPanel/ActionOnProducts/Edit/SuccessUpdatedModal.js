import React from 'react';
import {AlertModal} from "../../../../common/AlertModal/AlertModal";

export const SuccessUpdatedModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Оновлення товару"
					subjectText="Успішно"
					body="Товар успішно оновлено"
		/>
	)
};