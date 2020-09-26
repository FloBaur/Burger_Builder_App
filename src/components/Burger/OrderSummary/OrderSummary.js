import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'
// import {withRouter} from "react-router-dom";

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(key => {return <li key={key}> <span>{key}</span>: {props.ingredients[key]}</li>});

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Best Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <b>{props.price.toFixed(2)}€</b></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.cancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.success}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;