import React from 'react';
import {Icon} from 'react-fa';
import './Spinner.scss';

export const Spinner = () => {
    return (
        <div className="spinner-container">
            <Icon name="spinner fa-pulse"
                  size="2x"/>
        </div>
    )
};