import React, {useState, useEffect} from 'react'
import * as yup from 'yup'
import axios from 'axios'


const blankForm = {
    name: '',
    size: '',
    hasPepperoni: false,
    hasXCheese: false,
    hasAnchovy: false,
    hasPineapple: false,
    special: ''
}

export default function PizzaForm () {
    const [formState, setFormState] = useState({...blankForm})
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [errorState, setErrorState] = useState({...blankForm})
    //console.log('form', formState, 'btn', btnDisabled, 'error', errorState)

    //change handler
    const handleChanges = (event) => { 
        event.persist() 
        validateChange(event)
        setFormState({...formState, [event.target.name]:event.target.type === 'checkbox' ? event.target.checked : event.target.value})
        console.log('input changed!', formState)
    }

    //submit
    const submitOrder = (event) => {
        event.preventDefault()
        console.log('data submitted!', formState)
    }

    //form schema
    const formSchema = yup.object().shape({
        name: yup.string().min('limit: 2'),
        size: yup.string().oneOf(['small', 'medium', 'large'], 'Please select a size!'),
        hasPepperoni: yup.boolean().notRequired(),
        hasXCheese: yup.boolean().notRequired(),
        hasAnchovy: yup.boolean().notRequired(),
        hasPineapple: yup.boolean().notRequired(),
        special: yup.string().notRequired()
    })

    //form validate
    const validateChange = (event) => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.name === event.target.value)
            .then(valid => setErrorState({...errorState, [event.target.name]: ''}))
            .catch(error => {
                console.log('Please fix these validation errors:', errorState)
                setErrorState({...errorState, [event.target.name]:error.errors[0]})
            })
    }

//check entire form validity
    useEffect(() => {
        console.log('useEffect called')
        formSchema.isValid(formState)
            .then(validity => setBtnDisabled(validity))
    }, [formState])

    return (
        <section>
            <h2>Order Pizza!</h2>
            <form onSubmit={ submitOrder }>
                <label htmlFor='name'>Name:
                {/* must be at least 2 characters */}
                    <input id='name' name='name' type='text' onChange={ handleChanges } value={ formState.name }/>
                </label>
                <label htmlFor='size'>Pizza Size:
                    <select id='size' name='size' value={formState.size} onChange={ handleChanges }>
                        <option value=''>-- Select a Size --</option>
                        <option value='small'>Small - 14in</option>
                        <option value='medium'>Medium - 16in</option>
                        <option value='large'>Large - 18in</option>
                    </select>
                </label>
                <section>
                    <p>Toppings:</p>
                    <label htmlFor='hasXCheese'>Extra Cheese
                        <input id='hasXCheese' name='hasXCheese' type='checkbox'  checked={ formState.hasXCheese } onChange={ handleChanges }/>
                    </label>
                    <label htmlFor='hasPepperoni'>Pepperoni
                        <input id='hasPepperoni' name='hasPepperoni' type='checkbox' checked={ formState.hasPepperoni }  onChange={ handleChanges }/>
                    </label>
                    <label htmlFor='hasPineapple'>Pineapple
                        <input id='hasPineapple' name='hasPineapple' type='checkbox' checked={ formState.hasPineapple } onChange={ handleChanges }/>
                    </label>   
                    <label htmlFor='hasAnchovy'>Anchovies
                        <input id='hasAnchovy' name='hasAnchovy' type='checkbox' checked={ formState.hasAnchovy } onChange={ handleChanges }/>
                    </label>   
                </section>
                <label htmlFor='special'>Special Instructions:
                    <textarea id='special' name='special' value={ formState.special } onChange={ handleChanges }/>
                </label>
                <button disabled={ btnDisabled }>Place Order</button>
            </form>
        </section>
    )
}