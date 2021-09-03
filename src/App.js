import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import './App.css';
import LoginForm from './components/LoginForm';
import UserService from './services/UserService';

function App() {
  const { store } = useContext(Context)
  const [users, setUsers] = useState([])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])


  async function getUsers() {
    try {
      const response = await UserService.getUsers()
      setUsers(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return (
      <h1>Loading....</h1>
    )
  }



  if (!store.isAuth) {
    return (
      <div>
        <LoginForm />

        <div>
          <button onClick={getUsers}>Get All Users</button>
        </div>
        <div>
          {
            users.map(u =>
              <div key={u.email}>{u.email}</div>
            )
          }
        </div>
      </div>

    )
  }

  return (
    <div>
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
      <h4>{store.user.isActivated ? `Пользователь подтьвердил почту` : 'Подтвердитесь'}</h4>

      <button onClick={() => store.logout()} > Logout</button>
      <div>
        <button onClick={getUsers}>Get All Users</button>
      </div>
      <div>
        {
          users.map(u =>
            <div key={u.email}>{u.email}</div>
          )
        }
      </div>
    </div>
  );
}

export default observer(App);
