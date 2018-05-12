import React from 'react';
import {AlertModal} from "../../../../common/AlertModal/AlertModal";

export const SuccessDeletedCharacteristic = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Видалення властивості товару"
					subjectText="Успішно"
					body="Властивість успішно видалено"
		/>
	)
};