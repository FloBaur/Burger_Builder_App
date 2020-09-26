import React from 'react';
import './BuildControl.css';

const BuildControl = (props) => {

    return(
        <div className='BuildControl'>
            <p className='Label'>{props.label}</p>
            <button className='Less' onClick={props.removed} disabled={props.disabled}>Less</button>
            <button className='More' onClick={props.added}>More</button>
        </div>
    )

};


export default BuildControl;