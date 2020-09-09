import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { Button, Input } from './index'
import moment from 'moment'

export const BookComments = ({firebase, bookId}) => {

    const [comments, setComments ] = useState([])
    const [text, setCommentText ] = useState('')

    useEffect(() => {
        const unsubscribe = firebase.subscribeToBookComments({
            bookId,
            onSnapshot: (snapshot) => {

                const snapshotComments = [];
                snapshot.forEach(doc => {
                    snapshotComments.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
        
                setComments(snapshotComments);
            }
        
        })

        return() => {
            if(unsubscribe) unsubscribe()
        }
    }, [])

    const handlePostComment = (e) => {
        e.preventDefault();
        firebase.postComment({
            text,
            bookId
        })
    }

    return (
        <div> 
            <CommentForm onSubmit={handlePostComment}>
                <Input value={text} onChange={e => {
                    e.persist();
                    setCommentText(e.target.value)
                }} />
                <Button type="submit"> Post Comment </Button>
            </CommentForm>
            {comments.map((comment) => {
                return(
                    <CommentListItem key={comment.id}>
                        <strong>
                            {comment.username} - {moment(comment.dateCreated.toDate()).format('HH:mm Do MMM, YYYY')}
                        </strong>
                        <div>
                            {comment.text}
                        </div>
                    </CommentListItem>
                )
            })}
        </div>
    )
}

const CommentForm = styled.form`
    display: flex;
    margin-top: 2rem;

    ${Input} {
        margin: auto auto;
        margin-right: 1rem;
    }

    ${Button} {
        margin: auto 0;
    }
`

const CommentListItem = styled.div`
    > strong {
        font-size: 0.8rem;
        color: #666;
    }

    border-bottom: 1px solid #ddd;
    padding: 8px 0px;
`
