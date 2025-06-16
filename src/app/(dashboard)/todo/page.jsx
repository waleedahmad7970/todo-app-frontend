import TodoContent from "./TodoContent";

export default function Todo() {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">To Do List</h1>
            </div>
            <div className="row">
                <div className="col-12">
                    <TodoContent />
                </div>
            </div>
        </>
    );
}

