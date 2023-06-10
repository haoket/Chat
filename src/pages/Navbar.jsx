import React, { useContext, useState } from 'react'
import '../Styles/Navbar.scss'

import { signOut } from "firebase/auth"
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
    const { currentUser } = useContext(AuthContext)
    const [openBar, setOpenBar] = useState('flase')


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
            <div className='bar-mb'>
                <i className="fa-solid fa-x"></i>
            </div>
        </div>



    )
}

export default Navbar