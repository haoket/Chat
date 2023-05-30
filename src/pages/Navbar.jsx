import React, { useContext } from 'react'
import '../Styles/Navbar.scss'

import { signOut } from "firebase/auth"
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {


    const { currentUser } = useContext(AuthContext)


    return (
        <div className='navbar'>
            <span className='logo'>KetHao Chat</span>
            <div className='user'>
                <div className='avt'>
                    <img src={currentUser.photoURL} alt="" />
                </div>
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar