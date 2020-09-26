import React, {Component} from 'react';
import './Orders.css';
import Order from '../../components/Order/Order';
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component{

    state = {
        orders: null,
    };

    UNSAFE_componentWillMount() {
        axiosInstance.get('https://react-my-burger-fe2a0.firebaseio.com/orders.json').then(response => {

            const ordersArray = Object.keys(response.data).map(oKey => {return [...Array(response.data[oKey])]});
            this.setState({orders: ordersArray});

        })
        .catch(error =>{
                this.setState({error: true});
            });
    }

    render() {

        let ordersRender = <Spinner/>;
        let keyCount=0;

        if(this.state.orders) {

            let orders = this.state.orders;

            ordersRender = orders.map(i => {
                return <Order key={keyCount++} orderNumber={keyCount} ingredients={i[0].ingredients} price={i[0].price}/>
            });
        }

        return(

            <div>
                {ordersRender}
            </div>
        );
    }
}


export default Orders;
