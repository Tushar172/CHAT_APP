import React, { useEffect } from 'react'
import Man from '../../assets/man.png'
import Input from '../../components/Input'
import { useState } from 'react'

const Dashboard = () => {
    const contacts = [
        {
            name: 'John',
            status: 'Available',
            img: Man
        },
        {
            name: 'Jack',
            status: 'Available',
            img: Man
        },
        {
            name: 'Rock',
            status: 'Available',
            img: Man
        },
        {
            name: 'Bently',
            status: 'Available',
            img: Man
        },
        {
            name: 'Brock',
            status: 'Available',
            img: Man
        },
        {
            name: 'P2',
            status: 'Available',
            img: Man
        },
    ]
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user:details'))
        // console.log('loggedInuser=>',loggedInUser);
        const fetchConversation = async () => {
            const res = await fetch(`http://localhost:8000/api/conversations/${loggedInUser?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const resData = await res.json();
            // console.log(resData);
            setConversations(resData);
        }
        fetchConversation();
    }, [])

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:details')))
    const [conversations, setConversations] = useState([])
    // console.log(user);
    console.log("conversations", conversations)

    return (
        <div className='w-screen flex'>
            <div className='w-[25%] h-screen bg-primary-light'>
                <div className='flex justify-center items-center my-5'>
                    <div className='border border-primary p-[2px] rounded-full'><img src={Man} width={50} height={50} /></div>
                    <div className='ml-5'>
                        <h3 className='text-xl'>{user.fullName}</h3>
                        <h3 className='text-lg font-light'>My Account</h3>
                    </div>
                </div>
                <hr />
                <div className='mx-6 mt-8'>
                    <div className='text-primary text-xl'>Messages</div>
                    <div>
                        {
                            conversations.map(({ conversationId, user }) => {
                                // console.log("converstion:=>",conversation);

                                return (
                                    <div className='flex items-center py-6 border-b border-b-gray-400'>
                                        <div className='cursor-pointer flex items-center'>
                                            <div><img src={Man} width={40} height={40} /></div>
                                            <div className='ml-5'>
                                                <h3 className='text-lg font-semi-bold'>{user.fullName}</h3>
                                                <h3 className='text-sm font-light text-gray-400'>{user.email}</h3>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='w-[50%] h-screen bg-white flex flex-col items-center'>
                <div className='w-[75%] bg-primary-light h-[60px] my-5 rounded-full flex items=center px-10 py-1 shadow-md'>
                    <div className='cursor-pointer'><img src={Man} width={40} height={40} /></div>
                    <div className='ml-6 mr-auto'>
                        <h3 className='text-lg '>Tushar</h3>
                        <p className='text-sm font-light text-gray-600'>online</p>
                    </div>
                    <div className='cursor-pointer py-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                        </svg>
                    </div>

                </div>
                <div className='h-[75%] border w-full overflow-y-scroll shadow-sm'>
                    <div className='p-14'>
                        <div className=' max-w-[50%] bg-primary-light rounded-b-lg rounded-tr-xl p-4 mb-6'>
                            loren ipsum is simply dummy text of the primtinh and typestitng industry
                        </div>
                        <div className='max-w-[50%] bg-primary rounded-b-lg rounded-tl-xl ml-auto p-4 text-white mb-6'>
                            loren ipsum is simply dummy text of the primtinh and typestitng industry
                        </div>
                        <div className=' max-w-[50%] bg-primary-light rounded-b-lg rounded-tr-xl p-4 mb-6'>
                            loren ipsum is simply dummy text of the primtinh and typestitng industry
                        </div>
                        <div className='max-w-[50%] bg-primary rounded-b-lg rounded-tl-xl ml-auto p-4 text-white mb-6'>
                            loren ipsum is simply dummy text of the primtinh and typestitng industry
                        </div>
                        <div className=' max-w-[50%] bg-primary-light rounded-b-lg rounded-tr-xl p-4 mb-6'>
                            loren ipsum is simply dummy text of the primtinh and typestitng industry
                        </div>
                        <div className='max-w-[50%] bg-primary rounded-b-lg rounded-tl-xl ml-auto p-4 text-white mb-6'>
                            loren ipsum is simply dummy text of the primtinh and typestitng industry
                        </div>
                    </div>
                </div>
                <div className='p-10 w-full flex items-center'>
                    <Input placeholder='Type a message....' className='w-[80%]' inputClassName='p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none' />
                    <div className='ml-4 p-2 cursor-pointer bg-light rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                            <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
                        </svg>
                    </div>
                    <div className='ml-4 p-2 cursor-pointer bg-light rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <line x1="9" y1="12" x2="15" y2="12" />
                            <line x1="12" y1="9" x2="12" y2="15" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className='w-[25%] h-screen bg-light'>

            </div>

        </div>
    )
}

export default Dashboard
