import React from 'react';
import {AlertModal} from "../../../common/AlertModal/AlertModal";

export const SuccessChangedPhoneModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Зміна телефону"
					subjectText="Успішно"
					body="Телефон успішно змінено"
		/>
	)
};