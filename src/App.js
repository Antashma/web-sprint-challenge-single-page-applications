import React from "react";
import {Switch, Link, Route} from 'react-router-dom'
import PizzaHome from './PizzaHome'
import PizzaForm from "./PizzaForm";

const App = () => {
  return (
    <>
      <header>
        <h1>Lambda Eats</h1>
        <Link to='/'>Home</Link>
        <Link to='/order'>Place Order</Link>
      </header>
      <section>
      <Switch>
        <Route path='/order' component={ PizzaForm } />
        <Route path='/' component={ PizzaHome }/>

      </Switch>
      </section>
    </>
  );
};
export default App;
