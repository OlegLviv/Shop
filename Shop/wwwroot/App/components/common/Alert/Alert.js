import React from 'react';

export const Alert = (props) => {
	return (
		<div className={`alert alert-${props.alertType} alert-dismissible fade show`} role="alert">
			<strong>{props.subject}</strong> {props.body}
			<button type="button" className="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	)
};