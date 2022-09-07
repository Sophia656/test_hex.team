import React, { useState } from 'react';
import Button from '../UI/button/Button';
import Input from '../UI/input/Input';

const PaginationInput = ({setLimit, setChangeLimit, allLinks}) => {
    const [value, setValue] = useState(0)

    const handleChangeLimit = (e) => {
        e.preventDefault()
        if (value <= 0 || value > allLinks.length) {
            setLimit(5)
        } else {
            setLimit(value)
        }
        setChangeLimit(true)
    }

    return (
        <div>
            <Input type='number' placeholder='Введите число для выбора количества отображенных эдементов...' value={value} onChange={e => setValue(e.target.value)} />
            <Button onClick={e => handleChangeLimit(e)}>ПОКАЗАТЬ ПО {value}</Button>
        </div>
    );
};

export default PaginationInput;