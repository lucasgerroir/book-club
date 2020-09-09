import React, { useContext } from 'react'
import BookItem from '../components/bookItem'
import { BookComments } from '../components/common'
import { FirebaseContext } from '../components/Firebase'

const BookTemplate = (props) => {
    const { author, title, summary, localImage, id} = props.data.book
    const { firebase } = useContext(FirebaseContext) 

    return (
        <section>
            <BookItem author={author} imageUrl={localImage.childImageSharp.fixed} title={title} summary={summary} /> 
            {!!firebase && <BookComments bookId={id} firebase={firebase} /> }
        </section>
    )
}

export const query = graphql`
    query bookQuery($bookId: String!) {
        book(id: {eq: $bookId}) {
            title
            summary
            localImage{
              childImageSharp{
                fixed(width:200){
                  ...GatsbyImageSharpFixed
                }
              }
            }
            author {
              name
            }
            id
        }
    }   
`;

export default BookTemplate
