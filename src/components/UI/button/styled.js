import styled from 'styled-components'
import { PRIMARY_BACK, PRIMARY_BTN, PRIMARY_INPUT } from '../../../styles'

export const Btn = styled.button`
    min-height: 40px;
    height: fit-content;
    width: fit-content;
    min-width: 40px;
    max-width: 30vw;
    border-radius: 1vw;
    border: none;
    background: ${PRIMARY_BTN};
    font-size: 1rem;
    color: ${PRIMARY_BACK};
    margin: 1vh;
    padding: 1vh 1vw;
    transition-duration: 1.5s;
    transition-timing-function: easy-in-out;
    &:hover {
        background: ${PRIMARY_INPUT};
        color: ${PRIMARY_BTN};
    }
    ${props => props.active && `
        background: ${PRIMARY_INPUT};
    `}
`