import React from 'react';
import { InputWrapper } from './styled';

const Input = ({...props}) => {
    return (
        <InputWrapper {...props} />
    );
};

export default Input;