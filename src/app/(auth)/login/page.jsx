import Link from "next/link";
import LoginForm from "./LoginForm";

export default function Login() {
    return (
        <section className="contact_section layout_padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-md-4 col-sm-12">
                        <div className="form_container">
                            <div className="heading_container">
                                <h2>Login</h2>
                            </div>
                            <div className="mt-4">
                                <LoginForm />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <p>Dont have an account?</p>
                                <Link href="/register">
                                    Signup
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

