import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import BookItem from '../components/bookItem'

export default (props) => (
  <section>
      {props.data && props.data.allBook.edges.map((edge) => {
        const { id, title, author, summary, localImage } = edge.node
        return(
          <div key={id}>
              <BookItem title={title} imageUrl={localImage.childImageSharp.fixed} author={author} summary={summary}>
                <Link to={`book/${id}`}>
                    Join conversation
                </Link>
              </BookItem>
          </div>
        )
      })

      }
  </section>
)

export const query = graphql`
 {
  allBook {
    edges {
      node {
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
  }
}
`;
