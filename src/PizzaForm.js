import React, {useState, useEffect} from 'react'
import * as yup from 'yup'
import axios from 'axios'
import OnTheWay from './OnTheWay'

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
    const [orderState, setOrderState] = useState([])

    //submit
    const submitOrder = (event) => {
        event.preventDefault()
        axios.post('https://reqres.in/api/users', formState)
            .then(sucess => {
                console.log('⭐ Successfully posted form data: ', sucess.data)
                setOrderState([...orderState, {formState}])
                setFormState({...blankForm}) //clear form
            })
            .catch(failure => {
                console.log('⛔failed to post form data. please see error: ', failure)
            })
    }

    //form schema
    const formSchema = yup.object().shape({
        name: yup.string().min('2'), //must be min of 2 characters to pass
        size: yup.string().oneOf(['small', 'medium', 'large'], 'You must select a size!'), //one must be selected
        hasPepperoni: yup.boolean().notRequired(), //⏬ topping and special instructions can be unaltered 
        hasXCheese: yup.boolean().notRequired(),
        hasAnchovy: yup.boolean().notRequired(),
        hasPineapple: yup.boolean().notRequired(),
        special: yup.string().notRequired()
    })

    //form validate
    const validateChange = (event) => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.type === 'checkbox' ? event.target.checked : event.target.value)
            .then(valid => {
                setErrorState({...errorState, [event.target.name]: ''})
            })
            .catch(error => {
                setErrorState({...errorState, [event.target.name]:error.errors[0]})
                console.log('Please fix these validation errors:', errorState)
            })
    }

//change handler
    const handleChanges = (event) => { 
        event.persist()     
        setFormState({...formState, [event.target.name]:event.target.type === 'checkbox' ? event.target.checked : event.target.value})
        validateChange(event)
    }

//check entire form validity
    useEffect(() => {
        formSchema.isValid(formState)
            .then(validity => setBtnDisabled(!validity))
    }, [formState])

    return (
        <section>
            <h2>Order Pizza!</h2>
            <form onSubmit={ submitOrder }>
                <label htmlFor='name'>Name:
                    <input id='name' 
                        name='name' 
                        type='text' 
                        placeholder='ex. Mikey'
                        onChange={ handleChanges } 
                        value={ formState.name }
                        data-cy='name'/>
                    {errorState.name.length > 0 ? <p className='errorMsg'>{errorState.name}</p> : null}
                </label>
                <label htmlFor='size'>Pizza Size:
                    <select id='size' 
                        name='size' 
                        value={formState.size} 
                        onChange={ handleChanges }
                        data-cy='size'>
                        <option value=''>-- Select a Size --</option>
                        <option value='small'>Small - 14in</option>
                        <option value='medium'>Medium - 16in</option>
                        <option value='large'>Large - 18in</option>
                    </select>
                    {errorState.size.length > 0 ? <p className='errorMsg'>{errorState.size}</p> : null}
                </label>
                <section>
                    <p>Toppings:</p>
                    <label htmlFor='hasXCheese'>
                        <input id='hasXCheese' 
                            name='hasXCheese' 
                            type='checkbox'  
                            checked={ formState.hasXCheese } 
                            onChange={ handleChanges }
                            data-cy='xcheese'/>
                        Extra Cheese
                    </label>
                    <label htmlFor='hasPepperoni'>
                        <input id='hasPepperoni' 
                            name='hasPepperoni' 
                            type='checkbox' 
                            checked={ formState.hasPepperoni }  
                            onChange={ handleChanges }
                            data-cy='pepperoni'/>
                        Pepperoni
                    </label>
                    <label htmlFor='hasPineapple'>
                        <input id='hasPineapple'
                            name='hasPineapple' 
                            type='checkbox' 
                            checked={ formState.hasPineapple } 
                            onChange={ handleChanges }
                            data-cy='pineapple'/>
                        Pineapple
                    </label>   
                    <label htmlFor='hasAnchovy'>
                        <input id='hasAnchovy' 
                            name='hasAnchovy' 
                            type='checkbox' 
                            checked={ formState.hasAnchovy } 
                            onChange={ handleChanges }
                            data-cy='anchovy'/>
                        Anchovies
                        </label>   
                </section>
                <label htmlFor='special'>Special Instructions: <br />
                    <textarea id='special' 
                        name='special' 
                        placeholder='ex. Please leave by sewer...'
                        value={ formState.special } 
                        onChange={ handleChanges }
                        data-cy='special'/>
                </label>
                <button disabled={ btnDisabled } data-cy='submitBtn'>Add to Order</button>
            </form>
            <OnTheWay data = { orderState }/>
        </section>
    )
}