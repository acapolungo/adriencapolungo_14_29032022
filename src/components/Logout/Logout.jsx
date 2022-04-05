import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userSlice';
import { selectUser } from '../../utils/selectors';
import "./logout.css"

export default function Logout() {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(logout());
    }

    return (
        <div className="logout"> 
            {user ?
                <>
                    <h1 className='user__name'>Bonjour <span>{user.name} !</span></h1>
                    <button className='logout__button' onClick={(e) => handleLogout(e)} >Se déconnecter</button>
                </>
                : ""}

        </div>
    )
}
