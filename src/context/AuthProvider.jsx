"use client";
 
// import Loader from "@/app/(components)/loaders/Loader";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { API_URL } from '@/config';

const { createContext, useContext, useState } = require("react");

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const token = Cookies.get("authToken");
    const router = useRouter();
    const [errors, setErrors] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [authToken, setAuthToken] = useState(null);

    const register = async (payload) => {
        setIsLoading(true)
        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            
            if (!res.ok) {
                if (res.status === 422) {
                    if(data.errors) {
                        const allErrors = Object.values(data.errors).flat();
                        setErrors(allErrors)
                    }
                } else {
                    throw new Error(data.message || 'Registration failed');
                }

                return;
            }

            setSuccess("Thank you for signing up! Your account created successfully.");
            router.push(`/login`);
            
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const login = async (payload) => {
        setIsLoading(true)
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
        
            if (!res.ok) {
                if (res.status === 422) {
                    if(data.errors) {
                        const allErrors = Object.values(data.errors).flat();
                        setErrors(allErrors)
                    }
                } else {
                    throw new Error(data.message || 'Registration failed');
                }

                return;
            }

            Cookies.set("authToken", data.accessToken, { expires: 7 })
            setAuthToken(data.accessToken)
            toast.success("Login Successfull.")
            window.location.href = '/todo';

        } catch(error) {
            console.error('Login error:', error);    
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        setIsLoading(true)
        try {

            const res = await fetch(`${API_URL}/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            const data = await res.json();

            if (res.ok) {
                setAuthToken(null);
                Cookies.remove('authToken')
                toast.success("User logged out successfully.")
                router.push('/login')
            }

        } catch(error) {    
            console.error('Logout error:', error);
        } finally {
            setIsLoading(false)
        }
    }

    const clearAuthErrors = () => {
        setErrors("")   
    }

    const clearSuccessMsg = () => {
        setSuccess("")   
    }

    return (
        <AuthContext.Provider value={{ 
            isLoading, 
            authToken,
            login, 
            register, 
            logout, 
            errors, 
            clearAuthErrors,
            success,
            clearSuccessMsg 
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {

    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("Context will be wrapped inside AuthProvider");
    }

    return context;
};