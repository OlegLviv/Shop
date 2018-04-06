import React from 'react';
import {Icon} from 'react-fa';

const containerSpinnerStyle = {
    'margin-top': '15rem',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center'
};

export const Spinner = () => {
    return (
        <div className="spinner-container" style={containerSpinnerStyle}>
            <Icon name="spinner fa-pulse"
                  size="2x"/>
        </div>
    )
};