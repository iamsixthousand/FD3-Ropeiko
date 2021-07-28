import React from 'react';
import './RainbowFrame.css';

export const RainbowFrame = props => {
    return (
        <div className='RainbowFrame'>
            {props.colors.reduce((prev, color) => <div style={{ borderColor: color }}>{prev}</div>, props.children)}
        </div>
    );
}
