import React from 'react';
import './Chevron.scss';

const style = props => ({
	'transform': `rotate(${props.name ? (props.name === 'up' ? '45' : '225') : '45'}deg) scale(${props.scale ? props.scale : '1'})`
});

export const Chevron = props => {
	return (
		<div className={`chevron ${props.className} ${props.name}`} style={style(props)}>
			<div className="chevron__arrow"/>
		</div>
	);
};