import React, { useContext } from 'react';
import { AuthContext } from '../../context';
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
        <ModalWrapper>
            <h2>{title}</h2>
            <Input type="text" placeholder='Введите логин...' value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="text" placeholder='Введите пароль...' value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button style={{minWidth: '30vw'}} onClick={e => handleFunc(e)}>{btnText}</Button>
        </ModalWrapper>
    );
};

export default Modal;