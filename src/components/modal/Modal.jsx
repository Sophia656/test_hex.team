import React, { useContext } from 'react';
import { AuthContext } from '../../context';
import Button from '../UI/button/Button';
import { ModalInput, ModalWrapper } from './styled';

const Modal = ({title, username, setUsername, password, setPassword, btnText}) => {

    const {auth, authUser, loginUser} = useContext(AuthContext)

    const handleFunc = (e) => {
        e.preventDefault()
        if (auth) {
            authUser()
        } else {
            loginUser()
        }
    }
    return (
        <ModalWrapper>
            <h2>{title}</h2>
            <ModalInput type="text" placeholder='Введите логин...' value={username} onChange={(e) => setUsername(e.target.value)} />
            <ModalInput type="text" placeholder='Введите пароль...' value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={e => handleFunc(e)}>{btnText}</Button>
        </ModalWrapper>
    );
};

export default Modal;