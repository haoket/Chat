import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db } from '../firebase';
import { storage } from '../firebase';

const Input = () => {
    const [previewImage, setPreviewImage] = useState(null);
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const [uploadInProgress, setUploadInProgress] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

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

    const handleSend = async () => {
        if (uploadInProgress) return;

        if (img) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);

            try {
                setUploadInProgress(true);

                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        (error) => {
                            reject(error);
                        },
                        () => {
                            let isCompleted = false;

                            const checkUploadStatus = setInterval(() => {
                                if (uploadTask.snapshot.state === "success") {
                                    clearInterval(checkUploadStatus);
                                    isCompleted = true;

                                    getDownloadURL(uploadTask.snapshot.ref)
                                        .then(async (downloadURL) => {
                                            const message = {
                                                id: uuid(),
                                                senderId: currentUser.uid,
                                                date: Timestamp.now(),
                                                img: downloadURL,
                                            };

                                            if (text.trim() !== "") {
                                                message.text = text;
                                            }

                                            await updateDoc(doc(db, "chats", data.chatId), {
                                                messages: arrayUnion(message),
                                            });

                                            resolve();
                                        })
                                        .catch((error) => {
                                            reject(error);
                                        });
                                } else if (uploadTask.snapshot.state === "error") {
                                    clearInterval(checkUploadStatus);
                                    isCompleted = true;
                                    reject(new Error("Error uploading image"));
                                }
                            }, 200);

                            setTimeout(() => {
                                if (!isCompleted) {
                                    clearInterval(checkUploadStatus);
                                    resolve();
                                }
                            }, 1500);
                        }
                    );
                });
            } catch (error) {
                // Handle upload error
            } finally {
                setUploadInProgress(false);
            }
        } else {
            if (text.trim() !== "") {
                const message = {
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                };

                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion(message),
                });
            }
        }

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp(),
        });

        setText("");
        setImg(null);
        setPreviewImage(null);
    };

    return (
        <div className='inputContainer'>
            <input
                type="text"
                placeholder='Type something'
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <input
                style={{ display: 'none' }}
                type="file"
                id='file'
                onChange={(e) => {
                    setImg(e.target.files[0]);
                    handleFileChange(e);
                }}
            />
            {previewImage && (
                <img className='preView' src={previewImage} alt="Preview" />
            )}
            <label htmlFor='file' className='file'>
                <i className="fa-solid fa-images"></i>
            </label>
            <i className="fa-solid fa-paperclip"></i>
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Input;