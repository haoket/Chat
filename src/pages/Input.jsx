import React from 'react'

const Input = () => {
    return (
        <div className='inputContainer'>
            <input type="text" placeholder='Type some thing' />
            <i className="fa-solid fa-paperclip"></i>
            <i className="fa-solid fa-images"></i>
            <button>Send</button>
        </div>
    )
}

export default Input