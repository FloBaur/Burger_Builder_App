import * as actionTypes from './actionTypes';
import axiosInstance from "../../axios-orders";

//sync

export const purchaseBurgerSuccess = (id, orderData) => {

    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

//sync

export const purchaseBurgerFail = (error) => {

    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        errorMessage: error
    }
};

export const purchaseBurgerStart = () => {
    return{

        type: actionTypes.PURCHASE_BURGER_START
    };
};

//async

export const purchaseBurger = (orderData) => {

    return dispatch => {
        dispatch(purchaseBurgerStart());
        axiosInstance.post( 'orders.json', orderData)
            .then( response => {
                dispatch(purchaseBurgerSuccess(response.data, orderData));
            } )
            .catch( error => {
                dispatch(purchaseBurgerFail(error))
            } );
    }
};