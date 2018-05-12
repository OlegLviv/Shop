import React from 'react';
import {AlertModal} from "../../../../common/AlertModal/AlertModal";

export const SuccessOrderStatusChangedModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Оновлення статусу товару"
					subjectText="Успішно"
					body="Статус товару успішно оновлено"
		/>
	)
};