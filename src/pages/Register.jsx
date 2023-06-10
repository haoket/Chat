import React, { useState, useEffect } from 'react';
import '../Styles/Register.scss';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
    const [previewImage, setPreviewImage] = useState(null);
    const [err, setErr] = useState(false);
    const [img, setImg] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target.elements.username.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const file = e.target.elements.file.files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            setUploading(true);

            const interval = setInterval(async () => {
                if (uploadTask.snapshot.state === 'success') {
                    clearInterval(interval);

                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await updateProfile(res.user, {
                        displayName,
                        photoURL: downloadURL,
                    });
                    await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL,
                    });
                    await setDoc(doc(db, 'userChats', res.user.uid), {});

                    navigate("/Chat");
                } else if (uploadTask.snapshot.state === 'error') {
                    clearInterval(interval);
                    setErr(true);
                }
            }, 1000);
        } catch (error) {
            setErr(true);
        }
    };

    useEffect(() => {
        if (uploading) {
            const timeout = setTimeout(() => {
                clearInterval(interval);
                setErr(true);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [uploading]);

    return (
        <div className='formContainer'>
            <div className='formWraper'>
                <span className='logo'> Ket Hao Chat</span>
                <span className='title'> Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder='Tên người dùng' />
                    <input type="email" name="email" placeholder='Email' />
                    <input type="password" name="password" placeholder='Mật khẩu' />

                    <input style={{ display: 'none' }} type="file" id='file' name="file" onChange={(e) => {
                        setImg(e.target.files[0]);
                        handleFileChange(e);
                    }} />
                    {previewImage && (
                        <img className='preView' src={previewImage} alt="Preview" />
                    )}
                    <label htmlFor='file' className='file'>
                        <img src="https://t3.ftcdn.net/jpg/01/80/31/10/360_F_180311099_Vlj8ufdHvec4onKSDLxxdrNiP6yX4PnP.jpg" alt="" />
                        <span>Thêm ảnh</span>
                    </label>
                    <button>Đăng ký</button>

                    {err && <span>Đã xảy ra lỗi</span>}
                </form>
                <p>Bạn đã có tài khoản?<Link to='/Chat/login'>Đăng nhập tại đây</Link></p>
            </div>
        </div>
    );
};

export default Register;