import React, { useContext, useEffect, useState } from 'react'
import Messages from './Messages'
import '../Styles/Message.scss'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
const Message = () => {
    const [messages, setmessages] = useState([]);
    const { data } = useContext(ChatContext)


    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setmessages(doc.data().messages)
        });
        return () => {
            unsub()
        }
    }, [data.chatId]);
    console.log(messages)



    return (
        <div className='messContainer'>
            {messages ? (
                messages.map((m) => <Messages message={m} key={m.id} />)
            ) : (
                <p>No messages</p>
            )}






        </div>
    )
}

export default Message