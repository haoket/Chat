import React, { useContext, useEffect, useRef } from 'react'
import '../Styles/Input.scss'

import '../Styles/Messages.scss'

import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { storage } from '../firebase';
const Messages = ({ message }) => {

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext);
    const ref = useRef()
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])

    console.log("Message ID:", message);

    return (
        <div>
            <div className={` ${(() => {
                if (message.senderId === currentUser.uid) {
                    return "element-left";
                } else {
                    console.log("Sender ID:", message.senderId);
                    return "element-right";
                }
            })()}`}>
                <div className="text">
                    <div className='send' ref={ref}>
                        {message.text && <span>{message.text}</span>}
                        {message.img && <img src={message.img} alt="" />}
                    </div>

                    <img className='imgUser' src={message.senderId === currentUser.uid
                        ? currentUser.photoURL
                        : data.user.photoURL} alt=""
                        onLoad={() => console.log("IDdddddd", message.senderID)} />
                </div>
            </div>
        </div>
    )
}

export default Messages