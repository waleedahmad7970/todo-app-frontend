import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function Register() {
    return (
        <section className="contact_section layout_padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-md-6 col-sm-12">
                        <div className="form_container">
                            <div className="heading_container">
                                <h2>Signup</h2>
                            </div>
                            <div id="logreg-forms" className="mt-4">
                                <RegisterForm />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <p>Already have an account?</p>
                                <Link href="/login">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
