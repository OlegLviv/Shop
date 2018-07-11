import React from 'react';
import {AlertModal} from "../../../common/AlertModal/AlertModal";

export const SuccessSendedEmailConfirmCodeModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Підтвердження Email"
					subjectText="Успішно"
					body="Код для підтвердження вашого Email успішно надіслано на вашу пошту"
		/>
	)
};