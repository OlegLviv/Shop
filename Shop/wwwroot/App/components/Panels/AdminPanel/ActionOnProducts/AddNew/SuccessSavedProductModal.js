import React from 'react';
import {AlertModal} from "../../../../common/AlertModal/AlertModal";

export const SuccessSavedProductModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Збереження товару"
					subjectText="Успішно"
					body="Товар успішно збережено"
		/>
	)
};