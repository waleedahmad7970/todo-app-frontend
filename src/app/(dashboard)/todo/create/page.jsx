import TodoForm from "./TodoForm";

export default function CreateTodo() {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Create a To Do</h1>
            </div>
            <div className="row mb-5">
                <div className="col-8">
                    <TodoForm />
                </div>
            </div>
        </>
    );
}

