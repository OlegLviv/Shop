import React from 'react';
import {Icon} from 'react-fa';
import './Spinner.scss';

export const Spinner = props => {
	return (
		<div className={props.withoutHeight ? 'spinner-container--without-height' : 'spinner-container'}>
			<Icon name="spinner fa-pulse"
				  size="2x"/>
		</div>
	)
};