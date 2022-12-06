import { Textfit } from 'react-textfit';
import React, { useState } from 'react';


import "./DisplayScreen.css";

const DisplayScreen = ({value}) => {
    const [calcValue, setCalcValue] = useState('0');

    return(
        <Textfit className="display" mode="single" max={70}>{value}</Textfit>
    )
}

export default DisplayScreen;