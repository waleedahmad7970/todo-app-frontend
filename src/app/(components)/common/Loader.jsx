export default function Loader() {
    return (
        <div className="row">
            <div className="col-12 text-center">
                {/* <div className="spinner-grow text-primary"></div> */}
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
}

