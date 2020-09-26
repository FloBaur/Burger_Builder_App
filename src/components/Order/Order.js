import React from 'react';
import './Order.css'

const order = (props) => {

    return(
        <div className='Order'>
            <h1 className='headline'> Order {props.orderNumber}</h1>
            <p>Ingredients:</p>
                <ul>
                    <li>bacon: {props.ingredients.bacon}</li>
                    <li>cheese: {props.ingredients.cheese}</li>
                    <li>meat: {props.ingredients.meat}</li>
                    <li>salad: {props.ingredients.salad}</li>
                </ul>

            <p>Price: <strong>{props.price} €</strong></p>

        </div>
    )
};

export default order;