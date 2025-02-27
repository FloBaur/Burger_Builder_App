import React, { Component } from 'react';
import {connect} from 'react-redux'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css';
import {withRouter} from "react-router-dom";
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axiosInstance from "../../../axios-orders";
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm: {

                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name',
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Street',
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your ZIP',
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Country',
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Mail',
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },

                deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                value: 'fastest',
                validation: {},
                valid: true

            }
        },
        formIsValid: false
    };

    orderHandler = ( event ) => {
        event.preventDefault();
        const formData = {};

        for(let formElementIdentifier in this.state.orderForm)
        {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const Price = +this.props.price;
        const fixedPrice = Price.toFixed(2)
        const order =
            {
                ingredients: this.props.ing,
                price: fixedPrice,
                orderData: formData
            };

        this.props.onOrderBurger(order);

    };

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        console.log(isValid);

        return isValid;

    }

    inputHandler = (event, inputIdentifier) => {

        const updatedOrderForm = {       // 2 Way BINDING
            ...this.state.orderForm
        };

        const updatedFormElement = {...updatedOrderForm[inputIdentifier]}; //... um ein neues Objekt als Klon zu bauen
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm)
        {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

    };

    render () {

        const formElementsArray = [];
        for (let key in this.state.orderForm)
        {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key = {formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value = {formElement.config.value}
                        invalid={!formElement.config.valid}
                        changed = {(event) => this.inputHandler(event, formElement.id)}
                        shouldValidate = {formElement.config.validation}
                        touched={formElement.config.touched}
                    />
                    ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className='ContactData'>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        ing: state.ingredients,
        price: state.totalPrice,
        loading: state.loading
    };
};

const mapDispatchToProps = (dispatch) =>{
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData, axiosInstance)));