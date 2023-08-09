import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MdSportsGymnastics, MdOutlineAddCircleOutline } from 'react-icons/md';
import { IoPersonAdd } from 'react-icons/io5'

export default class Navbar extends Component {
    render() {
        return (
            <nav className='navbar'>
                <Link to="/" className='navbar-logo'>Exercise Tracker</Link>
                <ul className='my-nav'>
                    <li className='nav-item'>
                        <Link to="/" className='nav-link'>
                            <MdSportsGymnastics className='nav-icon'  /> 
                            <span>Exercises</span>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/create" className='nav-link'>
                            <MdOutlineAddCircleOutline className='nav-icon'  /> 
                            <span>Create Exercise Log</span>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/user" className='nav-link'>
                            <IoPersonAdd className='nav-icon' /> 
                            <span>Create User</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
