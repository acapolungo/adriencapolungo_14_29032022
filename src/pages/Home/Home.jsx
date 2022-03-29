import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../utils/selectors';

// components
import Form from '../../components/Form/Form';
import Login from '../../components/Login/Login';
import Logout from '../../components/Logout/Logout';

export default function Home() {

    const user = useSelector(selectUser);

    return (
        <main className='main'>
            {user ?
                <>
                    <Logout />
                    <h1>Current Employees</h1>
                    <Form />
                </>
                :
                <Login />
            }
        </main>
    )
}
