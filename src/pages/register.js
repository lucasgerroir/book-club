import React, { useState, useContext } from "react"
import { FirebaseContext } from "../components/Firebase"
import {Form, Input, Button, ErrorMessage} from '../components/common'

const Register = () => {

    const [formValues, setFormValues] = useState({ 
        email: '', 
        password: '', 
        confirmPassword: '',
        username: ''
    })
    const { firebase } = useContext(FirebaseContext);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(formValues.password === formValues.confirmPassword) {
            firebase.register({ 
                email: formValues.email, 
                password: formValues.password,
                username: formValues.username
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
        } else {
            setErrorMessage("Password and confirm password fields must match.")
        }
        
    }

    const handleInputChange = (e) => {
        e.persist();
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }

    return(
        <section>
            <Form onSubmit={handleSubmit}>
                <Input value={formValues.username} onChange={handleInputChange} name="username" placeholder="username" type="text" required />
                <Input value={formValues.email} onChange={handleInputChange} name="email" placeholder="email" type="email" required />
                <Input value={formValues.password} onChange={handleInputChange} name="password" placeholder="password" type="password" required minLength={6}/>
                <Input value={formValues.confirmPassword} onChange={handleInputChange} name="confirmPassword" placeholder="confirm password" type="password" required minLength={6} />
                {!!errorMessage && <ErrorMessage>
                    {errorMessage}
                </ErrorMessage>}
                <Button type="submit" block>
                    Register
                </Button>
            </Form>
        </section>
    )
}

export default Register
