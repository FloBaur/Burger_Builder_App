import React, {Component} from 'react';
import './Checkout.css';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {withRouter} from "react-router-dom";
import {Route, Redirect} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinueHandler = () => {

        this.props.history.replace('/checkout/contact-data');
    };


    render() {
        let summary = <Redirect to='/'/>
        if (this.props.ing) {
            summary = (
                <div className="orderSummary">
                    <CheckoutSummary ingredients={this.props.ing}
                                     checkoutCancelled={this.checkoutCancelledHandler}
                                     checkoutContinue={this.checkoutContinueHandler}/>
                    {this.props.orderSummary}
                    <Route path={this.props.match.path + '/contact-data'}
                           component={ContactData}/>
                </div>
            )
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return{
        ing: state.ingredients
    };
};

export default connect(mapStateToProps)(withRouter(Checkout));
