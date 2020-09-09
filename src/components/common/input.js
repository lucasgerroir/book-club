import styled from "styled-components"

export const Input = styled.input`
    display: block;
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #eee;
    margin-bottom: 8px;
    border-radius: 3px;
    box-shadow: none;

    &:focus, &.active {
        border: 1px solid rebeccapurple;
    }
`