import React from 'react';
import {withRainbowFrameHOC} from './withRainbowFrame.jsx';


let RainbowFrame = props => <div>{props.children}</div>;
RainbowFrame = withRainbowFrameHOC(props.colors)(RainbowFrame);

export {RainbowFrame};