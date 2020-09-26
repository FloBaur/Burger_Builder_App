import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import './App.css';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {BrowserRouter} from 'react-router-dom';


class App extends Component{
  render() {

    return (
        <BrowserRouter>
            <div>
              <Layout>
                <BurgerBuilder>
                </BurgerBuilder>
              </Layout>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
