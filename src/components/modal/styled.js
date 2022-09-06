import styled from 'styled-components'

export const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 30vw;
    height: 30vh;
    background: pink;
    padding: 3vw;
    position: relative;
    border-radius: 3vw;
    border: 2px solid brown;
    color: brown;
`

export const ModalInput = styled.input`
    height: 3vh;
    width: inherit;
    padding-left: 3vw;
    border-radius: 1vw;
    border: 2px solid brown;
`