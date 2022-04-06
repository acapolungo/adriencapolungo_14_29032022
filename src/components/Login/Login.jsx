import React, { useState } from 'react'
import { login } from '../../reducers/userSlice';
import { useDispatch } from 'react-redux';
import "./login.css"

/**
 * the login form retrieves the user's info && action sends it to the state
 * 
 * @component
 * @return { Login }
 */
export default function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            login({
                name: name,
                email: email,
                password: password,
                loggedIn: true,
            })
        );
    }

    return (
        <div className="form">
        <form className='login__form' onSubmit={(e) => handleSubmit(e)}>
        <h1 className="title">Se connecter</h1>
        <div className="subtitle">vos identifiants HRNet</div>
        <div className="input-container ic1">
          <input
          className="input"
          id="firstname" 
          type="text"
          placeholder=''
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          <div className="cut"></div>
          <label htmlFor="firstname" className="placeholder">First name</label>
        </div>
        <div className="input-container ic2">
          <input
          className="input"
          id="lastname"
          type="text"
          placeholder=''
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <div className="cut"></div>
          <label htmlFor="lastname" className="placeholder">Last name</label>
        </div>
        <div className="input-container ic2">
          <input
          className="input"
          id="email"
          type="text"
          placeholder=''
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <div className="cut cut-short"></div>
          <label htmlFor="email" className="placeholder">Email</label>
        </div>
        <button type="text" className='submit'>submit</button>
        </form>
      </div>
    )
}
