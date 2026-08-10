import React, { useEffect, useState } from 'react'

interface User {
    name: string;
    username: string;
    age: number;
    address: string;
}

const HomePage = () => {
    const [users , setUsers] = useState<User | null>(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(()=> {
        fetchedData()
    },[])

    const fetchedData = async() => {
        const res = await  fetch(`${backendUrl}/api/users`);
        const data = await res.json();
        setUsers(data);
    }
  return ( 
    <div>
      {
        users !== null ?(
            <>
            <h2 className='text-center text-3xl'>usersname: {users?.username}</h2>
            <p className='text-center text-2xl'>age: {users?.age}</p>
            </>
        ) :<h1 className='text-center text-4xl text-red-500'>Not Found Data</h1>
      }
    </div>
  )
}

export default HomePage
