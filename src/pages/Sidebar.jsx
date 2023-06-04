import React, { useContext, useEffect, useState } from 'react'
import '../Styles/Sidebar.scss'
import Navbar from './Navbar'
import User from '../assets/img/2.jpg'
import Search from './Search'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import Chat from './Chat'
const Sidebar = () => {

    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);


    useEffect(() => {

        const getChats = () => {


            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });


            return () => {
                unsub();
            };
        }

        currentUser.uid && getChats()
    }, [currentUser.uid]);
    // console.log(Object.entries(chats));


    const handleSelect = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u })

    }
    return (

        <div className='sidebar'>
            <Navbar />
            <div className='content'>
                <Search />


                {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(chat => (




                    <div className='user' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                        <img src={chat[1].userInfo.photoURL} alt="" />
                        <div className='details'>
                            <p className='UserName'>{chat[1].userInfo.displayName}</p>
                            <p className='new-text'>{chat[1].lastMessage?.text}</p>
                        </div>
                    </div>
                ))
                }


            </div>



        </div>

    )
}

export default Sidebar