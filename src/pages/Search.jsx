import React, { useContext, useState } from 'react'
import '../Styles/Search.scss'
import User from '../assets/img/2.jpg'
import { db } from "../firebase"
import { collection, doc, getDocs, getDoc, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { AuthContext } from '../context/AuthContext'
const Search = () => {
    const [userName, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", userName));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            }
            );
        } catch (err) {
            setErr(true)
        }
    };
    const handleKey = e => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        // kiem tra nhom chat co ton tai khong, neu khong co thi tao nhom moi
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            if (!res.exists()) {
                //tao mot nhom chat giua 2 nguoi trong chat collection firebase
                await setDoc(doc(db, "chats", combinedId), { message: [] });
                //create user chat
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + '.date']: serverTimestamp()
                });
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + '.date']: serverTimestamp()
                });
            }
        } catch (err) { }
        setUser(null);
        setUsername("");




    }

    return (

        <div className='search' >
            <div className='searchForm'>
                <input type="text" onKeyDown={handleKey} onChange={e => setUsername(e.target.value)} placeholder='Find a user'
                    value={userName} />
            </div>
            {err && <span>User not found!</span>}
            {user &&
                <div className='userChat' onClick={handleSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className='userInfo'>
                        <span>{user.displayName}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default Search