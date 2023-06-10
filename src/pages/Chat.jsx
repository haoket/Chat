import React, { useContext } from 'react'
import '../Styles/Chat.scss'
import Message from './Message'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'
const Chat = () => {

    const { data } = useContext(ChatContext);

    return (
        <div className='chatContainer' >

            <div className='top-header'>
                <p className='nameUser'>{data.user?.displayName}</p>
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