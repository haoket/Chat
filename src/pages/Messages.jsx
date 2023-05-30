import React from 'react'
import '../Styles/Input.scss'
import User from '../assets/img/2.jpg'
import '../Styles/Messages.scss'
import Pic from '../assets/img/3.jpg'
const Messages = () => {
    return (
        <div>
            <div className='element'>
                <div className='text'>
                    <div className='send'>
                        <span>Hi, how are you?</span>
                        <img src={Pic} alt="" />
                    </div>

                    <img className='imgUser' src={User} alt="" />
                </div>
            </div>

        </div>
    )
}

export default Messages