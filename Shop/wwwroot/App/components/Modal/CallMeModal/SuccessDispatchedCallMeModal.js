import React from 'react';
import {AlertModal} from "../../common/AlertModal/AlertModal";

export const SuccessDispatchedCallMeModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Зателефонуй мені"
					subjectText="Успішно"
					body="Ви успішно відправили запит. Скоро з вами зв'яжеться оператор"
		/>
	)
};