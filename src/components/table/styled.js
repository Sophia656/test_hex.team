import styled from 'styled-components'
import { PRIMARY_BACK, PRIMARY_BTN, PRIMARY_INPUT, PRIMARY_MAIN, SECONDARY_BACK } from '../../styles'


export const TableWrapper = styled.div`
    width: 100vw;
    color: ${PRIMARY_BACK};
`

export const TableContentWrapper = styled.div`
    width: 100vw;
    height: 70vh;
    background: ${SECONDARY_BACK};
    display: flex;
    flex-direction: column;
    overflow: scroll;
`
export const TableNames = styled.div`
    display: flex;
    width: 100vw;
    height: 6vh;
    background: ${PRIMARY_BTN};
    cursor: pointer;
`

export const CellName = styled.div`
    display: flex;
    border: 1px solid black;
    width: inherit;
    padding-left: 1vw;
    align-items: center;
    transition-duration: 1s;
    transition-timing-function: easy-in-out;
    &:first-child {
        border-left: none;
    }
    &:last-child {
        border-right: none;
    }
    &:hover {
        background: ${PRIMARY_INPUT};
        color: ${PRIMARY_MAIN};
    }
`

export const TableRow = styled.div`
    display: flex;
    width: inherit;
    height: inherit;
`
export const TableLink = styled.a`
    display: flex;
    overflow-wrap: anywhere;
    border: 1px solid black;
    width: inherit;
    min-height: 5vh;
    position: relative;
    color: ${PRIMARY_MAIN};
    padding: 1vw;
    align-items: center;
    text-decoration: underline;
    &:first-child {
        border-left: none;
    }
    &:hover {
        color: ${PRIMARY_INPUT};
    }
`

export const TableCounter = styled.div`
    display: flex;
    overflow-wrap: anywhere;
    border: 1px solid black;
    width: inherit;
    min-height: 5vh;
    position: relative;
    padding: 1vw;
    align-items: center;
    border-right: none;
    color: ${PRIMARY_MAIN};
`