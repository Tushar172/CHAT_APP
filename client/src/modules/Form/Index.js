import React, { useState } from 'react'
import Button from '../../components/Button/Index'
import Input from '../../components/Input'
import {  useNavigate } from 'react-router-dom'

const Form = (
    { isSignInPage = true, }
) => {
    const [data, setData] = useState({
        ...(!isSignInPage && {
            fullName: ''
        }),
        email: '',
        password: ''
    })
    
    const handleSubmit = async (e) => {
        console.log("data->:",data);
        e.preventDefault();
        const res= await fetch(`http://localhost:8000/api/${isSignInPage ? 'login' : 'register'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(res.status===400){
            alert('INVALID CREDENTIALS');
        }
        else{
            const resData=await res.json();
            if(resData.token)
            {
                localStorage.setItem('user:token',resData.token);
                localStorage.setItem('user:details',JSON.stringify(resData.user));
                navigate('/');
            }

        }
        
       

    }

    const navigate=useNavigate();
    return (
        <div className='bg-primary-light h-screen flex items-center justify-center'>
            <div className='bg-white w-[450px] h-[550px] shadow-lg rounded-lg flex flex-col justify-center items-center'>
                <div className='text-4xl font-extrabold'>Welcome {isSignInPage ? 'Back!' : 'Stranger!'}</div>
                <div className='text-xl font-light mb-14'> {isSignInPage ? 'Howdy!' : 'Sign up now to get started'}</div>
                <form className='flex flex-col items-center w-full' onSubmit={(e) => handleSubmit(e)}>
                    {!isSignInPage && <Input label="Full name" name="name" placeholder="Enter your full name" className='mb-6' value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} />}
                    <Input label="Email Address" type="email" name="email" placeholder="Enter your email" className='mb-6' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                    <Input label="Password" type="password" name="password" placeholder="Enter your password" className='mb-8' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                    <Button label={isSignInPage ? "Sign In" : "Sign Up"} type='submit' className="w-1/2 mb-2" />
                </form>
                <div>{isSignInPage ? "Didn't have an account" : 'Already have an account?'} <span className='text-primary cursor-pointer underline' onClick={()=>navigate(`/users/${isSignInPage? 'sign_up' : 'sign_in'}`)}>{isSignInPage ? "Sign Up" : "Sign In"}</span></div>
            </div>
        </div>
    )
}

export default Form
