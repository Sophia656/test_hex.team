import React from 'react';
import { Btn } from './styled';

const Button = ({children, ...props}) => {
    return (
        <Btn {...props}>
            {children}
        </Btn>
    );
};

export default Button;