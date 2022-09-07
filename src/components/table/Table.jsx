import React, { useCallback, useEffect, useState } from 'react';
import { CellName, TableContentWrapper, TableCounter, TableLink, TableNames, TableRow, TableWrapper } from './styled';

const Table = ({currentPageLinks, setCurrentPageLinks}) => {
    const [sortByLong, setSortByLong] = useState(false)
    const [sortByShort, setSortByShort] = useState(false)
    const [sortByCounter, setSortByCounter] = useState(false)

    const sortArr = useCallback(() => {
        if (sortByCounter) {
            setCurrentPageLinks(currentPageLinks.sort((a, b) => a.counter - b.counter))
            return setSortByCounter(false)
        }
        if (sortByLong) {
            setCurrentPageLinks(currentPageLinks.sort((a, b) => a.long.localeCompare(b.long)))
            return setSortByLong(false)
        }
        if (sortByShort) {
            setCurrentPageLinks(currentPageLinks.sort((a, b) => a.short.localeCompare(b.short)))
            return setSortByShort(false)
        }
    }, [sortByCounter, sortByLong, sortByShort, currentPageLinks])

    useEffect(() => {
        if (sortByCounter || sortByLong || sortByShort) {
            sortArr()
        }
    }, [sortByCounter, sortByLong, sortByShort])

    return (
        <TableWrapper>
            <TableNames>
                <CellName onClick={() => setSortByLong(true)}>
                    Исходная ссылка
                </CellName>
                <CellName onClick={() => setSortByShort(true)}>
                    Короткая ссылка
                </CellName>
                <CellName onClick={() => setSortByCounter(true)}>
                    Кол-во переходов
                </CellName>
            </TableNames>
            <TableContentWrapper>
                {currentPageLinks.map(info =>
                    <TableRow key={info.id}>
                        <TableLink href={info.long}>{info.long}</TableLink>
                        <TableLink href={info.short}>{info.short}</TableLink>
                        <TableCounter>{info.counter}</TableCounter>
                    </TableRow>
                )}
            </TableContentWrapper>
        </TableWrapper>
    );
};

export default Table;