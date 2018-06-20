import React from 'react';
import {AlertModal} from "../../../common/AlertModal/AlertModal";

export const SuccessDeletedCallMeModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Видалення зворотнього дзвінка"
					subjectText="Успішно"
					body="Зворотній дзвінок успіщно видалено"
		/>
	)
};