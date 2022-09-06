import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CellName, TableContentWrapper, TableCounter, TableLink, TableNames, TableRow, TableWrapper } from './styled';

const Table = ({allLinksInfo, setAllLinksInfo}) => {
    const [currentArray, setCurrentArray] = useState(allLinksInfo)
    const [sortByLong, setSortByLong] = useState(false)
    const [sortByShort, setSortByShort] = useState(false)
    const [sortByCounter, setSortByCounter] = useState(false)


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
                {allLinksInfo.map(info =>
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