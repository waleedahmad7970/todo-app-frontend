import { useAuth } from "@/context/AuthProvider";

export default function ErrorValidationAlert({ errors }) {

    const { clearAuthErrors } = useAuth();

    const handleClose = () => {
        clearAuthErrors();
    }

    return (
        <>
            <div className="alert alert-danger" role="alert">
                <button 
                    type="button" 
                    className="close" 
                    data-dismiss="alert" 
                    aria-label="Close"
                    onClick={handleClose}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
                <h6 className="alert-heading font-weight-bold">Errors</h6>
                <ul>
                    {errors.map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

