import React from 'react';
import { Link } from 'react-router-dom';
import '../Error/error.css';

/**
 * Setting Error in routes
 * 
 * @component
 * @return { Error }
 */
export default function Error() {
    return (
        <>
        <section className="error">
            <div className='error__title'>Error <span>404</span></div>
            <Link className='error__link' to="/"> Back to homepage </Link>
        </section>
        </>
    )
}
