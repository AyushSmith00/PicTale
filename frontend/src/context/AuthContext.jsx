import { useContext, createContext, useEffect, useState } from "react";
import api from "../api/axios.js"

const AuthContext = createContext();

export function AuthProvider({children}){

    const[user, setUser] = useState(null)
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        const getMe = async() => {
            try {
                const token = localStorage.getItem("accessToken")

                if(!token){
                    setLoading(false);
                     return;
                }

                const response = await api.get("/auth/me")

                setUser(response.data)

            } catch (error) {
                console.error(error.response?.data || error.message)

                localStorage.removeItem("accessToken");
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        getMe()
    }, [])

    const logout = () => {
        localStorage.removeItem("accessToken");
        setUser(null)
    }

    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);