import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import '../Styles/Home.scss'
const Home = () => {
    return (
        <div className='container'>
            <div className='home'>
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}

export default Home