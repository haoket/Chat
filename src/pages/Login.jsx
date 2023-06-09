import React, { useState } from 'react'
import '../Styles/Login.scss'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        // console.log(e.target[0].value)
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/Chat")


        } catch (e) {

            setErr(true)
        }
    }

    return (
        <div className='formContainer'>
            <div className='formWraper'>
                <span className='logo'> Ket Hao Chat</span>
                <span className='title'> Login</span>
                <form onSubmit={handleSubmit}>

                    <input type="email" placeholder='email' />
                    <input type="password" placeholder='password' />

                    <button>Sign In</button>

                </form>
                <p>You don't have an account? <Link to='/Chat/register'>Register</Link></p>
                {err && <span>Something went wrong</span>}

            </div>
        </div>
    )
}

export default Login