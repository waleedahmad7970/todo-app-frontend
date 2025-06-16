"use client";

import { Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from "@/app/(components)/common/Spinner";
import { useAuth } from '@/context/AuthProvider';
import ErrorValidationAlert from '../../(components)/common/ErrorValidationAlert';

const formValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('This is a required field'),
    last_name: Yup.string().required('This is a required field'),
    email: Yup.string().email().required('This is a required field'),
    password: Yup.string().required('This is a required field').min(6, 'Must be 6 characters or greater'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match')
});

export default function RegisterForm() {

    const { register, errors, clearAuthErrors, isLoading } = useAuth();

    const handleSubmit = async (values, formikBag) => {

        clearAuthErrors();

        const { setSubmitting, resetForm } = formikBag;

        const payload = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            passwordConfirmation: values.passwordConfirmation
        };

        try {
            await register(payload)
        } catch(error) {
            console.log(`Authentication error ${error}`)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            {errors && (
                <ErrorValidationAlert errors={errors} />
            )}

            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    passwordConfirmation: ''
                }}
                validationSchema={formValidationSchema}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit} className="mt-4 text-start">
                        <div className="row my-2">
                            <div className="col-md-6">
                                <label htmlFor="first_name">First Name<span className="text-danger ml-1">*</span></label>
                                <input 
                                    type="text" 
                                    className={formik.errors.first_name ? "form-control is-invalid" : "form-control"}
                                    id="first_name" 
                                    {...formik.getFieldProps('first_name')}
                                    placeholder="Enter first name" 
                                />
                                {formik.errors.first_name && (
                                    <div className="invalid-feedback">
                                        {formik.errors.first_name}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="last_name">Last Name<span className="text-danger ml-1">*</span></label>
                                <input 
                                    type="text" 
                                    className={formik.errors.last_name ? "form-control is-invalid" : "form-control"}
                                    id="last_name" 
                                    {...formik.getFieldProps('last_name')}
                                    placeholder="Enter last name" 
                                />
                                {formik.errors.last_name && (
                                    <div className="invalid-feedback">
                                        {formik.errors.last_name}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-12">
                                <label htmlFor="email">Email<span className="text-danger ml-1">*</span></label>
                                <input 
                                    className={formik.errors.email ? "form-control is-invalid" : "form-control"}
                                    type="email"
                                    id="email"
                                    {...formik.getFieldProps('email')}
                                    placeholder="Enter email" 
                                />
                                {formik.errors.email && (
                                    <div className="invalid-feedback">
                                        {formik.errors.email}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-12">
                                <label htmlFor="password">Password<span className="text-danger ml-1">*</span></label>
                                <input 
                                    className={formik.errors.password ? "form-control is-invalid" : "form-control"}
                                    type="password"
                                    id="password"
                                    {...formik.getFieldProps('password')}
                                    placeholder="Enter password" 
                                />
                                {formik.errors.password && (
                                    <div className="invalid-feedback">
                                        {formik.errors.password}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-12">
                                <label htmlFor="confirm_password">Confirm Password<span className="text-danger ml-1">*</span></label>
                                <input 
                                    className={formik.errors.passwordConfirmation ? "form-control is-invalid" : "form-control"}
                                    type="password"
                                    id="confirm_password"
                                    {...formik.getFieldProps('passwordConfirmation')}
                                    placeholder="Reenter password" 
                                />
                                {formik.errors.passwordConfirmation && (
                                    <div className="invalid-feedback">
                                        {formik.errors.passwordConfirmation}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-12 text-center">
                                <button 
                                    type="submit" 
                                    className="btn btn-block btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading && <Spinner color="white" />}
                                    {!isLoading && "Signup"}
                                </button>
                            </div>
                            {/* <div className="col-md-12 mt-1">
                                <Link href="#" id="forgot_pswd">Forgot password?</Link>
                            </div> */}
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
}

