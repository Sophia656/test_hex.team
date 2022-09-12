import React, { useContext } from 'react';
import Modal from '../../components/modal/Modal';
import Button from '../../components/UI/button/Button';
import ErrorPopup from '../../components/UI/error-popup/ErrorPopup';
import { AuthContext } from '../../context';
import { LoginWrapper } from './styled';

const LoginPage = () => {
    const {setRegister, setUsername, username, setPassword, password, loginError} = useContext(AuthContext)

    return (
        <LoginWrapper>
            <Modal title='ВХОД' username={username} setUsername={setUsername} password={password} setPassword={setPassword} btnText='ВОЙТИ' />
            <Button onClick={() => setRegister(true)}>НЕ ЗАРЕГИСТРИРОВАНЫ? ЗАРЕГИСТРИРОВАТЬСЯ!</Button>
            {loginError && <ErrorPopup>{loginError}</ErrorPopup>}
        </LoginWrapper>
    );
};

export default LoginPage;