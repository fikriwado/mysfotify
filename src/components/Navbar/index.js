import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

function Navbar() {
    const dispatch = useDispatch();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>Musify</h1>
            </div>
            <div className="navbar-login">
                <button className="btn btn-green" onClick={() => dispatch(logout())}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
