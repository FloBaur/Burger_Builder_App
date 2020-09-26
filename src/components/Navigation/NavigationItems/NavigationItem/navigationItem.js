import React from 'react';
import './NavigationItem.css';
import {NavLink} from "react-router-dom";


const navigationItem = (props) => {

    return(
             <li className='navigationItem'>
                 <NavLink to={'/' + props.text} exact >{props.text}</NavLink>
             </li>
    )
};

export default navigationItem;