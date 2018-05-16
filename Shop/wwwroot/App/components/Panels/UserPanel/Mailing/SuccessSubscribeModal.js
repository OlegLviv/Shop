import React from 'react';
import {AlertModal} from "../../../common/AlertModal/AlertModal";

export const SuccessSubscribeModal = ({isOpen, onClose}) => {
	return (
		<AlertModal isOpen={isOpen}
					onCloseAlertModal={onClose}
					headerText="Підписка на розсилку"
					subjectText="Успішно"
					body="Дякуємо за успішну підписку на розсилку новинок та акційних пропозицій"
		/>
	)
};