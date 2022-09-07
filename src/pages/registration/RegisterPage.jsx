import React, { useContext } from 'react';
import Modal from '../../components/modal/Modal';
import Button from '../../components/UI/button/Button';
import ErrorPopup from '../../components/UI/error-popup/ErrorPopup';
import { AuthContext } from '../../context';
import { RegisterWrapper } from './styled';

const RegisterPage = () => {
    const {setRegister, setUsername, username, setPassword, password, authError} = useContext(AuthContext)

    return (
        <RegisterWrapper>
            <Modal title='РЕГИСТРАЦИЯ' username={username} setUsername={setUsername} password={password} setPassword={setPassword} btnText='ЗАРЕГИСТРИРОВАТЬСЯ' />
            <Button onClick={() => setRegister(false)}>ЗАРЕГИСТРИРОВАННЫ? ВОЙТИ!</Button>
            {authError && <ErrorPopup>{authError}</ErrorPopup>}            
        </RegisterWrapper>
    );
};

export default RegisterPage;