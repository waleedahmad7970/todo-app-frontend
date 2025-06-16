export default function Spinner({ color }) {
    return (
        <div className={`spinner-border text-${color}`} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
}
