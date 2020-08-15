import React from 'react'
import axios from 'axios'

export default function PizzaForm () {
    return (
        <section>
            <h2>Order Pizza!</h2>
            <form>
                <label htmlFor='name'>Name:
                {/* must be at least 2 characters */}
                    <input id='name' name='name' type='text' />
                </label>
                <label htmlFor='size'>Pizza Size:
                    <select id='size' name='size'>
                        <option value=''>-- Select a size --</option>
                        <option value='small'>Small - 14in</option>
                        <option value='medium'>Medium - 16in</option>
                        <option value='large'>Large - 18in</option>
                    </select>
                </label>
                <section>
                    <p>Toppings:</p>
                    <label htmlFor='top-xcheese'>Extra Cheese
                        <input id='top-xcheese' name='top-xcheese' type='checkbox' value='x-cheese' />
                    </label>
                    <label htmlFor='top-pepperoni'>Pepperoni
                        <input id='top-xcheese' name='top-xcheese' type='checkbox' value='pepperoni' />
                    </label>
                    <label htmlFor='top-pineapple'>Pineapple
                        <input id='top-pineapple' name='top-pineapple' type='checkbox' value='pineapple' />
                    </label>   
                    <label htmlFor='top-anchovis'>Anchovies
                        <input id='top-pineapple' name='top-pineapple' type='checkbox' value='pineapple' />
                    </label>   
                </section>
                <label htmlFor='special'>Special Instructions:
                    <textarea id='special' name='special' value='' />
                </label>
                <button>Place Order</button>
            </form>
        </section>
    )
}