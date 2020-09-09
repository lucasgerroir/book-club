import React, { useState, useContext, useEffect } from "react"
import {Form, Input, Button } from '../components/common'
import { FirebaseContext } from "../components/Firebase"
import styled from "styled-components"

let fileReader;

if(typeof window !== undefined) {
    fileReader = new FileReader();
}

const AddBook = () => {

    const { firebase } = useContext(FirebaseContext);

    useEffect(()=> {
           
        fileReader.addEventListener('load', () => {
                setFormValues(currentValues => ({
                    ...currentValues,
                    bookCover: fileReader.result
                }))
            })
    }, [])

    useEffect(()=> {

        if(firebase) {
            // query all authors
            firebase.getAuthors()
            .then(snapshot => {
                const allAuthors = [];
                snapshot.forEach( doc => {
                    allAuthors.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })

                setAuhtors(allAuthors)
            })
        }

    }, [firebase])


    const [formValues, setFormValues] = useState({ 
        name: '',
        author: '',
        bookCover: '',
        summary: ''
    })
    
    const [authors, setAuhtors] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    
    const handleSubmit = (e) =>{
        e.preventDefault();

        firebase.createBook({
            name: formValues.name,
            author: formValues.author,
            bookCover: formValues.bookCover,
            summary: formValues.summary
        })
        .then(()=>{
            setSuccess(true)
        })
    }
    
    const handleInputChange = (e) => {
        e.persist();
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
        setSuccess(false)
    }

    return(
        <Form onSubmit={handleSubmit}>
            <FormField>
                <Input onChange={handleInputChange} name="name" type="text" value={formValues.name} placeholder="Book name" required />
            </FormField>
            <FormField>
                <label htmlFor="author"> Book Author: </label>
                <select onChange={handleInputChange} name="author" value={formValues.author} placeholder="Author" required>
                    <option value=""> Select an author</option>
                    {authors.map( author => {
                        return(
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        )
                    })}
                </select>
            </FormField>
            <FormField>
                <label htmlFor="bookCover"> Book Cover: </label>
                <Input name="bookCover" type="file" required onChange={e => {
                    e.persist();
                    fileReader.readAsDataURL(e.target.files[0])
                }} />
            </FormField>
            <FormField>
                <textarea onChange={handleInputChange} type="text" name="summary" value={formValues.summary} placeholder="Book Summary" required />
            </FormField>
            {!!success && <span>
                New Book Added Successfully
            </span>}
            <Button type="submit" block>
                Add new book
            </Button>
        </Form>
    )
}

const FormField = styled.div`
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    label {
        font-weight: bold;
        margin-bottom: 0.6rem;
        font-size: 0.8rem;
    }
`

export default AddBook;
