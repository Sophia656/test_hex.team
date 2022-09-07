import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthContext } from './context';
import { useLocalStorage } from './hooks/useLocalStorage';
import LoginPage from './pages/login/LoginPage';
import MainPage from './pages/main/MainPage';
import RegisterPage from './pages/registration/RegisterPage';


const App = () => {
  // для того чтобы не выбрасывало на вход - сохраняем в локалсторадже то что пользователь вошел
  const [isAuth, setIsAuth] = useLocalStorage('auth', false)
  // регистрация или вход
  const [register, setRegister] = useState(false)
  // для инпутов
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // сохраняем тек токен
  const [token, setToken] = useLocalStorage('token', '')
  // для тек ошибки входа
  const [authError, setAuthError] = useState('')
  const [loginError, setLoginError] = useState('')

  const loginUser = async () => {
      await axios({
              method: 'POST',
              url: 'https://79.143.31.216/login',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'access-control-allow-origin': 'interest-cohort'
              },
              data: { 'grand-type': `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`},
          })
          .then(response => {
              setToken(response.data.access_token)
              setUsername('')
              setPassword('')
          })
          .catch(error => {
            setLoginError('Неверный логин или пароль!')
          })
    }

  const authUser = async () => {
    if (username && password) {
      await axios({
            method: 'POST',
            url: 'https://79.143.31.216/register',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-control-allow-origin': 'interest-cohort'
            },
            params: {username: username, password: password}
        })
        .then(response => {
          if (response.status === 200) {
            loginUser()
          }
        })
        .catch(error => {
            setAuthError('Пользователь с таким именем уже существует!')
        })
      } else {
        setAuthError('Введите данные!')
      }
  }

  // только если мы получили токен
  useEffect(() => {
    if (token !== '') {
      setIsAuth(true)
    } else {
      setIsAuth(false)
      localStorage.clear()
    }
  }, [token])

  return (
    <AuthContext.Provider value={{
      register,
      setRegister,
      authUser,
      loginUser,
      authError,
      loginError,
      username,
      setUsername,
      password,
      setPassword,
      token,
      isAuth,
      setIsAuth,
      setToken
    }}>
        {isAuth
        ?
        <MainPage />
        :
        register
        ?
        <RegisterPage />
        :
        <LoginPage />
        }
    </AuthContext.Provider>
  );
};

export default App;
