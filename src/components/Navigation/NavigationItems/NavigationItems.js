import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/navigationItem'


const navigationItems = (props) => {

    let NavigationItemArray = ['BurgerBuilder', 'Checkout', 'Orders'];

    return(

            <ul className='NavigationItems'>
                {NavigationItemArray.map(item => {return  <NavigationItem key={item} text={item} active></NavigationItem> })}
            </ul>

    )
};

export default navigationItems;