import React from 'react';
import { ErrorWrapper } from './styled';

const ErrorPopup = ({children}) => {
    return (
        <ErrorWrapper>
            {children}
        </ErrorWrapper>
    );
};

export default ErrorPopup;