export default function SuccessAlert({ msg }) {
    return (
        <>
            <div className="alert alert-success" role="alert">
                <button 
                    type="button" 
                    className="close" 
                    data-dismiss="alert" 
                    aria-label="Close"
                //    onClick={handleClose}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
                <p><strong className="pr-2">Well Done!</strong>{msg}</p>
            </div>
        </>
    );
}
