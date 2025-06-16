"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getCookie } from "@/utils/clientCookie";
import { API_URL } from "@/config";
import TodoEditForm from './TodoEditForm';
import Loader from '@/app/(components)/common/Loader';

export default function TodoContent() {

    const params = useParams(); 
    const token = getCookie();
    const [formData, setFormData] = useState("");
    console.log(formData)
    
    useEffect(() => {
        
        if(params.id) {
            fetchTodo(params.id)
        }
    
    }, [params.id]);
        
    const fetchTodo = async (id) => {

        try {

            const res = await fetch(`${API_URL}/todos/${id}/edit`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            const data = await res.json();

            setFormData(data.todo)            

        } catch(error) {    
            console.error('Logout error:', error);
        } finally {
            //
        }
    }

    return (
        <>
            {formData && (
                <div className="row">
                    <div className="col-8">
                        <TodoEditForm
                            data={formData} 
                        />
                    </div>
                </div>
            )}
            {!formData && (
                <Loader />
            )}
        </>
    );
}

