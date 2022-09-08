import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context';
import { PRIMARY_BACK, PRIMARY_MAIN } from '../../styles';
import Button from '../UI/button/Button';
import Input from '../UI/input/Input';
import { ModalWrapper } from './styled';

const Modal = ({title, username, setUsername, password, setPassword, btnText}) => {
    const {register, authUser, loginUser} = useContext(AuthContext)
    
    const handleFunc = (e) => {
        e.preventDefault()
        if (register) {
            authUser()
        } else {
            loginUser()
        }
    }
    return (
        <ModalWrapper color={register && PRIMARY_MAIN} back={register && PRIMARY_BACK}>
            <h2>{title}</h2>
            <Input height='true' type="text" placeholder='Введите логин...' value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input height='true' type="password" placeholder='Введите пароль...' value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button style={{minWidth: '20vw'}} onClick={e => handleFunc(e)}>{btnText}</Button>
        </ModalWrapper>
    );
};

export default Modal;