import { createContext,useState,useEffect } from "react";

export const userData = createContext({})
export function render(){
    this.forceUpdate()
}
export function UserDataProvider({children}){
    const [loggedUser,setLoggedUser] = useState(null);
    useEffect(()=>{
        fetchData();
    },[])
    const fetchData = async ()=>{   
        if(!loggedUser){
        const response = await fetch(
            `http://localhost:8000/user`
            ,{
                credentials: 'include'
              });
        const result = await response.json();
        console.log(result)
        setLoggedUser(result);
        }
    }
    return (
    <userData.Provider value={{loggedUser , setLoggedUser}}>
        {children}
    </userData.Provider>
    )
}