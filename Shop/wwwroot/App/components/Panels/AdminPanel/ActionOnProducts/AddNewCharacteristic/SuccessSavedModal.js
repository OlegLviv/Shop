import React from 'react';
import {AlertModal} from "../../../../common/AlertModal/AlertModal";

export const SuccessSavedModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Збереження властивості товару"
					subjectText="Успішно"
					body="Властивість успішно додано до товару"
		/>
	)
};