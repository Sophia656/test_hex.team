import styled from 'styled-components'

export const InputWrapper = styled.input`
    height: 4vh;
    width: inherit;
    padding-left: 3vw;
    border-radius: 1vw;
    border: 2px solid brown;
    background: pink;
    font-size: 1rem;
    transition-duration: 1s;
    transition-timing-function: easy-in-out;
    &:hover {
        height: 5vh;
        border: 2px solid pink;
        background: white;
    }
`