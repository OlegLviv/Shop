import React from 'react';
import {AlertModal} from "../../../common/AlertModal/AlertModal";

export const SuccessChangedEmailModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Зміна Email"
					subjectText="Успішно"
					body="Email успішно змінено"
		/>
	)
};