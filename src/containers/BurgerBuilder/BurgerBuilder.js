import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {Route, Switch, Redirect} from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import {withRouter} from "react-router-dom";
import Orders from "../Orders/Orders";
import * as actionTypes from "../../store/actions";
import {connect} from 'react-redux';

let INGREDIENT_PRICES = {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0
};

class BurgerBuilder extends Component{

    state = {


        loading: false,
        error: false
    };

    componentDidMount() {

        // axiosInstance.get('https://react-my-burger-fe2a0.firebaseio.com/ingredients.json').then(response => {
        //     this.setState({ingredients: response.data});
        // })
        // .catch(error =>{
        //     this.setState({error: true});
        // });

        axiosInstance.get('https://react-my-burger-fe2a0.firebaseio.com/prices.json').then(response => {
            INGREDIENT_PRICES = response.data;
        })
            .catch(error =>{
                this.setState({error: true});
            });
    }

    updatePurchaseState = (ingredients) =>{

        let sum = Object.keys(ingredients)
            .map(igKey => {return ingredients[igKey]
            })
            .reduce((sum,el) =>{
                return sum + el;
                },0);

       return  sum > 0;

    };

    purchaseHandler = () => {

        this.setState({purchasing: true});

    };


    purchaseCancelHandler = () => {

        this.setState({purchasing: false});

    };

    purchaseContinueHandler = () => {

        this.props.history.push('/checkout');

    };

    render() {

        const disableInfo = {
            ...this.props.ing
        };

        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key]<= 0
        }

        let orderSummary = null;

        let burger = this.state.error ? <p> Ingredients can't be loaded </p> : <Spinner/>;

        if (this.props.ing){

            burger = (
            <Aux>

                <Burger ingredients = {this.props.ing}/>

                <BuildControls
                    ingredientAdded={this.props.onAddIngredient}
                    ingredientRemoved={this.props.onRemoveIngredient}
                    disabled = {disableInfo}
                    price = {this.props.prc}
                    purchaseable = {this.updatePurchaseState(this.props.ing)}
                    purchasing = {this.purchaseHandler}
                />
            </Aux>);

            orderSummary = <OrderSummary ingredients = {this.props.ing}
                                         success={this.purchaseContinueHandler}
                                         cancel={this.purchaseCancelHandler}
                                         price = {this.props.prc}/>;
        }

        if(this.state.loading)
        {
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>

                        {orderSummary}

                </Modal>
                <Switch>
                    <Redirect from='/BurgerBuilder' to='/'/>
                    <Route path="/" exact render={() => burger}/>
                    <Route path="/Checkout" render={() => <Checkout orderSummary = {orderSummary}/>}/>
                    <Route path='/Orders' render={() => <Orders/>}/>

                </Switch>

            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ing: state.ingredients,
        prc: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onAddIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onRemoveIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(BurgerBuilder, axiosInstance)));