import React from 'react'
import '../Styles/Sidebar.scss'
import Navbar from './Navbar'
import User from '../assets/img/2.jpg'
const Sidebar = () => {
    return (

        <div className='sidebar'>
            <Navbar />
            <div className='content'>
                <p className='title'>Find a user</p>
                <div className='user'>
                    <img src={User} alt="" />
                    <div className='details'>
                        <p className='UserName'>Ket Hao</p>
                        <p className='new-text'>Ban co khoe khong?</p>
                    </div>
                </div>
                <div className='user'>
                    <img src={User} alt="" />
                    <div className='details'>
                        <p className='UserName'>Ket Hao</p>
                        <p className='new-text'>Ban co khoe khong?</p>
                    </div>
                </div>
                <div className='user'>
                    <img src={User} alt="" />
                    <div className='details'>
                        <p className='UserName'>Ket Hao</p>
                        <p className='new-text'>Ban co khoe khong?</p>
                    </div>
                </div>

                <div className='user'>
                    <img src={User} alt="" />
                    <div className='details'>
                        <p className='UserName'>Ket Hao</p>
                        <p className='new-text'>Ban co khoe khong?</p>
                    </div>
                </div>

            </div>



        </div>

    )
}

export default Sidebar