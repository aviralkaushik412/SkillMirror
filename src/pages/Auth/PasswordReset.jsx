import React, { useState } from 'react'
import { auth } from '../../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'

const PasswordReset = () => {
    const [email,setEmail] = useState("")
    const submitHandler = async (e) =>{
        e.preventDefault();
        try{
            await sendPasswordResetEmail(auth,email)
            alert("Mailed")
        }catch(e){
            console.log(e.message)
        }
        setEmail("")
    }
  return (
    <div>
        <form className="bg-gray-800 text-white max-w-md mx-auto mt-24 p-8 rounded-2xl shadow-lg" onSubmit={submitHandler}>
        <h1 className="text-2xl font-semibold mb-6 text-center">Reset Your Password</h1>

        <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 mb-4 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e)=>{
                setEmail(e.target.value);
            }}
        />

        <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition duration-300 text-white py-2 px-4 rounded"
            
        >
            Reset
        </button>
        </form>

    </div>
  )
}

export default PasswordReset