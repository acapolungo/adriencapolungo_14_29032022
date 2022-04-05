import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../utils/selectors';
import { Navigate } from 'react-router-dom';

// components
import Login from '../../components/Login/Login';

export default function Home() {

    const user = useSelector(selectUser);

    return (
        <main className='main'>
            {user ?
                <>
                    {/* <Logout /> */}
                    <Navigate to='/employeelist' />
                </>
                :
                <Login />
            }
        </main>
    )
}
