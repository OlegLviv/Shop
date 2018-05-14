import React from 'react';
import {AlertModal} from "../../../../common/AlertModal/AlertModal";

export const MaxSizeFileAlertModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Помилка"
					subjectText=""
					body="Розмір файлу не повинен перевищувати 3 MB"
					isError
		/>
	)
};