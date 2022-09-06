import React, { useContext, useState } from 'react';
import Modal from '../../components/modal/Modal';
import Button from '../../components/UI/button/Button';
import ErrorPopup from '../../components/UI/error-popup/ErrorPopup';
import { AuthContext } from '../../context';
import { RegisterWrapper } from './styled';

const RegisterPage = () => {
    const {setAuth, setUsername, username, setPassword, password, authError} = useContext(AuthContext)

    return (
        <RegisterWrapper>
            <Modal title='РЕГЕСТРАЦИЯ' username={username} setUsername={setUsername} password={password} setPassword={setPassword} btnText='ЗАРЕГЕСТРИРОВАТЬСЯ' />
            <Button onClick={() => setAuth(false)}>ЗАРЕГЕСТРИРОВАННЫ? ВОЙТИ!</Button>
            {authError && <ErrorPopup>{authError}</ErrorPopup>}            
        </RegisterWrapper>
    );
};

export default RegisterPage;