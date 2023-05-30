import React from 'react'
import '../Styles/Chat.scss'
import Message from './Message'
import Input from './Input'
const Chat = () => {
    return (
        <div className='chatContainer' >
            <div className='top-header'>
                <p className='nameUser'>Trang</p>


                <div className='item'>
                    <i className="fa-solid fa-video"></i>
                    <i className="fa-solid fa-user-plus"></i>
                    <i className="fa-solid fa-ellipsis"></i>
                </div>

            </div>
            <Message />
            <Input />

        </div>
    )
}

export default Chat