import React from 'react';
import {AlertModal} from "../../../../common/AlertModal/AlertModal";

export const SuccessDeletedModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Видалення товару"
					subjectText="Успішно"
					body="Товар видалено успішно"
		/>
	)
};