import React, { useCallback, useEffect, useState } from 'react';
import { CellName, TableContentWrapper, TableCounter, TableLink, TableNames, TableRow, TableWrapper } from './styled';

const Table = ({currentPageLinks,
    sortByCounter, 
    setSortByCounter, 
    sortByLong, 
    setSortByLong, 
    sortByShort, 
    setSortByShort}) => {

    return (
        <TableWrapper>
            <TableNames>
                <CellName active={sortByLong} onClick={() => setSortByLong(!sortByLong)}>
                    Исходная ссылка
                </CellName>
                <CellName active={sortByShort} onClick={() => setSortByShort(!sortByShort)}>
                    Короткая ссылка
                </CellName>
                <CellName active={sortByCounter} onClick={() => setSortByCounter(!sortByCounter)}>
                    Кол-во переходов
                </CellName>
            </TableNames>
            <TableContentWrapper>
                {currentPageLinks.map(info =>
                    <TableRow key={info.id}>
                        <TableLink href={info.long}>{info.long}</TableLink>
                        <TableLink onClick={() => navigator.clipboard.writeText(`${info.short}`)} href={info.short}>{info.short}</TableLink>
                        <TableCounter>{info.counter}</TableCounter>
                    </TableRow>
                )}
            </TableContentWrapper>
        </TableWrapper>
    );
};

export default Table;