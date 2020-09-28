import React, {Component} from 'react';
import './Checkout.css';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {withRouter} from "react-router-dom";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

class Checkout extends Component{

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinueHandler = () => {

        this.props.history.replace('/checkout/contact-data');
    };


    render() {

        return(

            <div className="orderSummary">
                {this.props.orderSummary}

                <CheckoutSummary ingredients={this.props.ing}
                                 checkoutCancelled = {this.checkoutCancelledHandler}
                                 checkoutContinue = {this.checkoutContinueHandler}/>
                <Route path={this.props.match.path + '/contact-data'}
                       component={ContactData}/>
            </div>
        );
        }
    }

const mapStateToProps = state => {
    return{
        ing: state.ingredients
    };
};

export default connect(mapStateToProps)(withRouter(Checkout));
