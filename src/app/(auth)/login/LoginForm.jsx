"use client";

import * as Yup from 'yup';
import { Formik } from 'formik';
import ErrorValidationAlert from '../../(components)/common/ErrorValidationAlert';
import { useAuth } from '@/context/AuthProvider';
import Spinner from '../../(components)/common/Spinner';

const validationSchema = Yup.object().shape({
    email: Yup.string().required('This field is required.'),
	password: Yup.string().required('This field is required.'),
});

export default function LoginForm() {

    const { login, errors, clearAuthErrors, isLoading } = useAuth();

    const handleSubmit = async (values, formikBag) => {

        clearAuthErrors();

        const { setSubmitting, resetForm } = formikBag;

        const payload = {
            email: values.email,
            password: values.password
        };

        try {
            await login(payload)
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
                    email: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit} className="mt-4 text-start">
                        <div className="row my-2">
                            <div className="col-md-12">
                                <label htmlFor="email">Email<span className="text-danger ml-1">*</span></label>
                                <input 
                                    type="email" 
                                    className={formik.errors.email ? "form-control is-invalid" : "form-control"}
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
                        <div className="row my-3">
                            <div className="col-md-12">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-block"
                                    disabled={isLoading}
                                >
                                    {isLoading && <Spinner color="white" />}
                                    {!isLoading && "Login"}
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