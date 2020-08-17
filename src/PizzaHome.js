import React from 'react';
import pizzaImg from './Assets/Pizza.jpg'
import {Link} from 'react-router-dom'

export default function PizzaHome() {
    return (
        <div>
            <h2>Pizza Home</h2>
            
            <img src= { pizzaImg } alt='delicious pizza' />
            <Link to='/order'>Order Now!</Link>
        </div>
    )
}