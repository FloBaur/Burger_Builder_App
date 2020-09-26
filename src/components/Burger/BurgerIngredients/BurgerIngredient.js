import React, {Component}  from 'react';
import Proptypes from 'prop-types';
import './BurgerIngredients.css';

class BurgerIngredient extends Component{

    render(){

        let ingredient = null;

        if(this.props.type ==='bread-bottom') {

            ingredient = <div className='BreadBottom'></div>;
        }
        else if (this.props.type ==='bread-top'){

            ingredient = <div className='BreadTop'>
                <div className='Seeds1'>  </div>
                <div className='Seeds2'> </div>
            </div>;
        }

        else if (this.props.type ==='meat'){

            ingredient = <div className='Meat'> </div>;
        }
        else if (this.props.type ==='salad'){

            ingredient = <div className='Salad'> </div>;
        }
        else if (this.props.type ==='cheese'){

            ingredient = <div className='Cheese'> </div>;
        }
        else if (this.props.type ==='bacon'){

            ingredient = <div className='Bacon'> </div>;
        }

        BurgerIngredient.propTypes = {
            type: Proptypes.string.isRequired
        };

    return ingredient;
    }
}

export default BurgerIngredient;