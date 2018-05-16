import React from 'react';
import {AlertModal} from "../../../../common/AlertModal/AlertModal";

export const MaxImageAlertModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Помилка"
					subjectText=""
					body="Ви не можете обрати більше 3-х зображень"
					isError
		/>
	)
};