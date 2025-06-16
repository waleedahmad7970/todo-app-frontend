"use client";

import { useSearchParams } from 'next/navigation';
import useSwr from "swr";
import { API_URL } from "@/config";
import { fetcherWithToken } from "@/lib/fetcher-with-token";
import Loader from "@/app/(components)/common/Loader";
import Link from "next/link";
import SuccessAlert from '@/app/(components)/common/SuccessAlert';
import toast from 'react-hot-toast';
import { getCookie } from "@/utils/clientCookie";

export default function TodoContent() {

    const searchParams = useSearchParams();
    const msg = searchParams.get('q');
    const token = getCookie();

    const { data, error, isLoading, mutate } = useSwr(`${API_URL}/todos`, fetcherWithToken)
    
    if(error) {
        return <div className="text-center py-5 text-danger">Error loading listing: {error.message}</div>;
    }
    
    if(isLoading && !data) {
        return <Loader />
    }

    const todos = data.todos || [];
    // Now safe to use length
    if (todos.length === 0) return <p className="text-center">No ToDo Found!</p>;

    function getStatus(status)
    {
        if(status == "in_progress") {
            return (<span className="badge badge-warning">In Progress</span>);
        } else {
            return (<span className="badge badge-success">Finished</span>);
        }
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        if (!confirmed) return;

        const res = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`, // Bearer token authorization
            },
        });

        if (res.ok) {
            mutate(
                `${API_URL}/todos`,
                (currentItems) => currentItems.filter((item) => item.todos.id !== id),
                false
            )
            toast.success("A todo task deleted successfully.")   
        } else {
            toast.error("Failed to delete the item.")
        } 
    }

    const handleStatus = async (id) => {
        const confirmed = window.confirm('Are you sure you want to change the status of this item?');
        if (!confirmed) return;

        const res = await fetch(`${API_URL}/todos/${id}/status`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`, // Bearer token authorization
            },
        });

        if (res.ok) {
            mutate(
                `${API_URL}/todos`,
                (currentItems) => currentItems.filter((item) => item.todos.id !== id),
                false
            )
            toast.success("A todo task status changed successfully.")   
        } else {
            toast.error("Woops! Something went wrong.")
        } 
    }

    return (
        <>
            {msg && (
                <SuccessAlert
                    msg={msg} 
                />
            )}

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Task</th>
                        <th scope="col">Due Date</th>
                        <th scope="col" className="text-center">Status</th>
                        <th scope="col" className="border text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{todo.title}</td>
                            <td>{todo.due_date}</td>
                            <td className="text-center">
                                {getStatus(todo.status)} 
                            </td>
                            <td className="text-center">
                                <Link 
                                    href={`/todo/${todo.id}/edit`}
                                    data-toggle="tooltip" 
                                    data-placement="top" 
                                    title="Edit"
                                >
                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                </Link>
                                <Link 
                                    href="#" 
                                    className="ml-2"
                                    onClick={() => handleDelete(todo.id)}
                                    data-toggle="tooltip" 
                                    data-placement="top" 
                                    title="Delete"
                                >
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </Link>
                                <Link 
                                    href="#" 
                                    className="ml-2"
                                    onClick={() => handleStatus(todo.id)}
                                    data-toggle="tooltip" 
                                    data-placement="top" 
                                    title="Finish"
                                >
                                    <i className="fa fa-check-square" aria-hidden="true"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}    
                </tbody>
            </table>
        </>
    );
}

