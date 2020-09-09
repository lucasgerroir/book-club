import React from 'react'
import styled from 'styled-components'
import Img from "gatsby-image"


const Item = ({ title, summary, author, imageUrl, children }) => {
    return (
        <BookItemWrapper>
            <div className="image">
                <Img fixed={imageUrl} />
            </div>
            <div className="text">
                <h2>{title} <small>{author.name}</small></h2>
                <p>{summary}</p>
                {children}
            </div>
        
        </BookItemWrapper>
    )
}

export default Item

const BookItemWrapper = styled.section`
    h2 {
        small {
            font-weight: normal;
            padding-left: 1rem;
        }
    }
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;

    .image {
        flex: 1;
        padding-right: 2rem;
    }

    .text {
        flex: 3
    }
`
