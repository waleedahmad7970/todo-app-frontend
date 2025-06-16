import TodoContent from "./TodoContent";

export default function page() {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Edit a To Do</h1>
            </div>
            
            <TodoContent />
                
        </>
    );
}
