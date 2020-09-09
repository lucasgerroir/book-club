import React, { useState, useContext } from "react"
import {Form, Input, Button, ErrorMessage} from '../components/common'
import { FirebaseContext } from "../components/Firebase"

const AddAuthor = () => {

    const { firebase } = useContext(FirebaseContext);

    const [formValues, setFormValues] = useState({ 
        name: ''
    })
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        firebase.createAuthor({
            authorName: formValues.name
        })
    }
    
    const handleInputChange = (e) => {
        e.persist();
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Input onChange={handleInputChange} name="name" value={formValues.name} placeholder="Author name" />
            <Button type="submit" block>
                Add new author
            </Button>
        </Form>
    )
}

export default AddAuthor;