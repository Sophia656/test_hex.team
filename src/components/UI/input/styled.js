import styled from 'styled-components'
import { PRIMARY_BACK, PRIMARY_BTN, PRIMARY_INPUT } from '../../../styles'

export const InputWrapper = styled.input`
    min-height: 5vh;
    min-width: 20vw;
    width: calc(inherit - 2vw);
    padding-left: 3vw;
    border-radius: 1vw;
    margin: 1vh 0;
    border: none;
    background: ${PRIMARY_INPUT};
    color: ${PRIMARY_BTN};
    font-size: 1rem;
    transition-duration: 1s;
    transition-timing-function: easy-in-out;
    &:hover {
        background: ${PRIMARY_BACK};
        ${props => props.height && `
            min-height: 5.5vh;
        `}
    }
`