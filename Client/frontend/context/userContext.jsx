import axios from 'axios'
import {createContext, useEffect, useState} from 'react'

export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [user, setUser] = useState(null)

    const loginUser = async (username, password) => {
        try {
            const { data } = await axios.post('/verifyLogin', {
                username,
                password
            }, { withCredentials: true });

            if (data.error) {
                console.log(data.error);
            } else {
                setUser(data); // Update user context upon successful login
                console.log("Login successful");
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    useEffect(() => {
        if(!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data)
            })
        }
    }, [])


    // Function to handle user logout
    const logoutUser = async () => {
        try {
            const {data} = await axios.get('/logout')
            console.log(data)
            setUser(null)
        } catch (error) {
            console.error('Error logging out:', error)
            // Handle error (e.g., show error message to user)
        }
    }

    // Function to reset user
    const resetUser = () => {
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, logoutUser, resetUser, loginUser }}>
            {children}
        </UserContext.Provider>
    )
}