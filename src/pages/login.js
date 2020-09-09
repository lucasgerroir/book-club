import React, { useState, useContext } from "react"
import { FirebaseContext } from "../components/Firebase"
import {Form, Input, Button, ErrorMessage} from '../components/common'

const Login = () => {

    const [formValues, setFormValues] = useState({ email: '', password: ''})
    const { firebase } = useContext(FirebaseContext);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        firebase.login({ email: formValues.email, password: formValues.password})
        .catch((error)=>{
            setErrorMessage(error.message)
        })
    }

    const handleInputChange = (e) => {
        e.persist();
        setErrorMessage('')
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }

    return(
        <section>
            <Form onSubmit={handleSubmit}>
                <Input value={formValues.email} onChange={handleInputChange} name="email" placeholder="email" type="email" required />
                <Input value={formValues.password} onChange={handleInputChange} name="password" placeholder="password" type="password" required />
                {!!errorMessage && <ErrorMessage>
                    {errorMessage}
                    </ErrorMessage>}
                <Button type="submit" block>
                    Login
                </Button>
            </Form>
        </section>
    )
}

export default Login
