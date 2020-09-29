import * as actionTypes from "../actions/actionTypes";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.8
};

const burgerBuilder = (state = initialState, action) => {  //this is the reducer, always receives a state and the action

    if(action.type === actionTypes.ADD_INGREDIENT)
    {
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        };
    }
    if(action.type === actionTypes.REMOVE_INGREDIENT)
    {
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        };
    }
    if(action.type === actionTypes.SET_INGREDIENTS) {
        return {
            ...state,
            // ingredients: action.ingredients,
            ingredients: {
                salad: action.ingredients.salad, // action maps on the actions/burgerBuilder -> reaches out to the web/firebase
                cheese: 0,
                meat: 0,
                bacon: 0
            },
            error: false
        };
    }

    if(action.type === actionTypes.FETCH_INGREDIENTS_FAILED) {
        return {
            ...state,
            error: true
        };
    }

    return state;
};

export default burgerBuilder;