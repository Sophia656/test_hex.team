import styled from 'styled-components'

export const Btn = styled.button`
    min-height: 5vh;
    height: fit-content;
    width: fit-content;
    min-width: 5vw;
    max-width: 30vw;
    border-radius: 1vw;
    border: 2px solid white;
    background: brown;
    font-size: 1rem;
    color: white;
    margin: 1vh;
    padding: 1vh 1vw;
    transition-duration: 1s;
    transition-timing-function: easy-in-out;
    &:hover {
        background: pink;
        border: 2px solid brown;
        color: brown;
    }
`