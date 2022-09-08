import styled from 'styled-components'
import { PRIMARY_BACK, PRIMARY_MAIN } from '../../styles'

export const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 30vw;
    height: 30vh;
    background: ${props => props.back || PRIMARY_MAIN};
    padding: 3vw;
    position: relative;
    border-radius: 3vw;
    border: 2px solid ${PRIMARY_BACK};
    color: ${props => props.color || PRIMARY_BACK};
`