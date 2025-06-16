"use client";

import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { getCookie } from "@/utils/clientCookie";
import { API_URL } from "@/config";
import ErrorValidationAlert from "@/app/(components)/common/ErrorValidationAlert";
import Spinner from "@/app/(components)/common/Spinner";
import { useRouter } from "next/navigation";
import axios from 'axios';

const formValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required field.'),
    description: Yup.string().required('Description is a required field.'),
    due_date: Yup.date().required('Due Date is a required field').min(new Date(), 'Due date can not be in past')
});

export default function TodoEditForm({ data }) {

    const token = getCookie();
    const router = useRouter();
    const [errors, setErrors] = useState("");
    const [selectFile, setSelectedFile] = useState("");

    useEffect(() => {
        setSelectedFile(data.file_path)
    }, [data]);

    const handleSubmit = async (values, formikBag) => {

        clearAlerts();

        const { setSubmitting, resetForm } = formikBag;

        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('title', values.title)
        formData.append('description', values.description)
        formData.append('due_date', values.due_date)
        formData.append('pdf_file', values.pdf_file)

        try {
            const response = await axios.post(`${API_URL}/todos/${values.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            
            router.push('/todo?q=To do task updated successfully.')

        } catch (error) {
            if(error.response.data.errors) {
                const allErrors = Object.values(error.response.data.errors).flat();
                setErrors(allErrors);
            }
        } finally {
            resetForm(true)
            setSubmitting(false)
        }
    }

    const clearAlerts = () => {
        setErrors("") 
    }

    return (
        <>
            {errors && (
                <ErrorValidationAlert errors={errors} />
            )}

            <Formik
                initialValues={{
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    due_date: data.due_date,
                    pdf_file: '',
                }}
                validationSchema={formValidationSchema}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit} className="mt-4 text-start">
                        <div className="row my-2">
                            <div className="col-md-12">
                                <label htmlFor="title">Task Title<span className="text-danger ml-1">*</span></label>
                                <input 
                                    type="text" 
                                    className={formik.errors.title ? "form-control is-invalid" : "form-control"}
                                    id="title" 
                                    {...formik.getFieldProps('title')}
                                    placeholder="Enter first name" 
                                />
                                {formik.errors.title && (
                                    <div className="invalid-feedback">
                                        {formik.errors.title}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-12">
                                <label htmlFor="description">Task Description<span className="text-danger ml-1">*</span></label>
                                <textarea 
                                    className={formik.errors.description ? "form-control is-invalid" : "form-control"}
                                    id="description" 
                                    rows="4"
                                    {...formik.getFieldProps('description')}
                                    placeholder="Enter description" 
                                ></textarea>
                                {formik.errors.description && (
                                    <div className="invalid-feedback">
                                        {formik.errors.description}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-12">
                                <label htmlFor="due_date">Due Date<span className="text-danger ml-1">*</span></label>
                                <input 
                                    className={formik.errors.due_date ? "form-control is-invalid" : "form-control"}
                                    type="date"
                                    id="due_date"
                                    {...formik.getFieldProps('due_date')}
                                    placeholder="Enter due_date" 
                                />
                                {formik.errors.due_date && (
                                    <div className="invalid-feedback">
                                        {formik.errors.due_date}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-12">
                                <label>Attachment</label>
                                <div className="custom-file">
                                    <label className="custom-file-label" htmlFor="pdf_file">Choose a file</label>
                                    <input 
                                        className={formik.errors.pdf_file ? "custom-file-input is-invalid" : "custom-file-input"}
                                        type="file"
                                        id="pdf_file"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                const selectedFile = e.target.files[0];
                                                setSelectedFile(selectedFile)
                                                if (selectedFile.type === 'application/pdf') {
                                                    formik.setFieldValue('pdf_file', selectedFile)
                                                 //   setFileError(null);
                                                } else {
                                                  //  setFileError('Please upload a PDF file');
                                                }
                                            }
                                        }}
                                    />
                                    <small className="text-muted">Only PDF files are allowed</small>
                                    {formik.errors.pdf_file && (
                                        <div className="invalid-feedback">
                                            {formik.errors.pdf_file}
                                        </div>
                                    )}
                                    {selectFile && (
                                        <ul className="mt-2">
                                            <li>
                                                <div className="d-flex justify-content-between">
                                                    <p className="my-2">{selectFile.name || selectFile}</p>
                                                    <button 
                                                        className="border-0 bg-white" 
                                                        onClick={() => {
                                                            setSelectedFile("")
                                                            formik.setFieldValue('pdf_file', "")
                                                        }}
                                                    >
                                                        <i className="fa fa-close" />
                                                    </button>
                                                </div>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-12 text-center">
                                <button 
                                    type="submit" 
                                    className="btn btn-block btn-primary"
                                    disabled={formik.isSubmitting}
                                >
                                    {formik.isSubmitting && <Spinner color="white" />}
                                    {!formik.isSubmitting && "Update a Todo"} 
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
}
