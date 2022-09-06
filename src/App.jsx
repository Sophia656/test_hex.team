import axios from 'axios';
import React, { useState } from 'react';
import { AuthContext } from './context';
import LoginPage from './pages/login/LoginPage';
import MainPage from './pages/main/MainPage';
import RegisterPage from './pages/registration/RegisterPage';


const App = () => {
  // вход
  const [showMain, setShowMain] = useState(false)
  // регистрация или вход
  const [auth, setAuth] = useState(true)
  // для инпутов
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // сохраняем тек токен
  const [token, setToken] = useState('')
  // для тек ошибки входа
  const [authError, setAuthError] = useState('')
  const [loginError, setLoginError] = useState('')

  const loginUser = async () => {
      await axios({
              method: 'POST',
              url: 'http://79.143.31.216/login',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: { 'grand-type': `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`},
          })
          .then(response => {
              setToken(response.data.access_token)
              setShowMain(true)
          })
          .catch(error => {
            setLoginError('Неверный логин или пароль!')
          })
    }

  const authUser = async () => {
    if (username && password) {
      await axios({
            method: 'POST',
            url: 'http://79.143.31.216/register',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            params: {username: username, password: password}
        })
        .then(response => {
          if (response.status === 200) {
            loginUser()
            setShowMain(true)
          }
        })
        .catch(error => {
            setAuthError('Пользователь с таким именем уже существует!')
        })
      } else {
        setAuthError('Введите данные!')
      }
    }

  return (
    <AuthContext.Provider value={{
      auth,
      setAuth,
      authUser,
      loginUser,
      authError,
      loginError,
      username,
      setUsername,
      password,
      setPassword,
      token
    }}>
    <>
      {showMain
      ?
      <MainPage />
      :
      <>
        {auth
          ?
          <RegisterPage />
          :
          <LoginPage />
          }
      </>
      }
      
    </>
    </AuthContext.Provider>
  );
};

export default App;
