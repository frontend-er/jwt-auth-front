import { observer } from 'mobx-react-lite';
import React from 'react';
import { Context } from '..';

function LoginForm(props) {
   const [email, setEmail] = React.useState('')
   const [password, setPassword] = React.useState('');
   const { store } = React.useContext(Context)

   return (
      <div>
         <input value={email} onChange={e => setEmail(e.target.value)} type='text' placeholder='Email' />
         <input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Password' />
         <button onClick={() => store.login(email, password)}>Login</button>
         <button onClick={() => store.registration(email, password)}>Registration</button>

      </div>
   );
}

export default observer(LoginForm);