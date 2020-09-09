import styled from "styled-components"

export const Button = styled.button`
    padding: 8px 16px;
    background-color: rebeccapurple;
    color: white;
    border-radius: 4px;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    ${({block}) => block ? 'display:block; width: 100%;' : ''}

    &:hover {
        background-color: indigo;
    }
 
`