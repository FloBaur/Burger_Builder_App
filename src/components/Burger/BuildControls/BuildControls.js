import React from 'react';
import './BuildControls.css';
import BuildControl from "./BuildControl/BuildControl";
// import Route from "react-router/modules/Route";

const BuildControls = (props) => {

    const controls = [
        {label: 'Salad', type: 'salad'},
        {label: 'Bacon', type: 'bacon'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Meat', type: 'meat'}
    ];

    return(
        <div className='BuildControls'>

            <p>Current Price: <strong>{props.price.toFixed(2)} €</strong></p>

            {controls.map(ctrl => <BuildControl key ={ctrl.label}
                                                label = {ctrl.label}
                                                added={() => props.ingredientAdded(ctrl.type)}
                                                removed={() => props.ingredientRemoved(ctrl.type)}
                                                disabled = {props.disabled[ctrl.type]}
            />)}

            <button className='OrderButton' disabled={!props.purchaseable} onClick={props.purchasing}>ORDER NOW</button>
            {/*<Link to={'/Checkout'} exact><button className='OrderButton' disabled={!props.purchaseable} >ORDER NOW</button></Link>*/}


        </div>
    )
};

export default BuildControls;