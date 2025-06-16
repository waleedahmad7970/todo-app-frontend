import NavItem from "./NavItem";

export default function SideBar() {
    return (
        <>
            <div className="sidebar-sticky pl-3">
                <ul className="nav flex-column">
                    <NavItem
                        icon="fa fa-list-alt"
                        text="Todo List" 
                        link="/todo"
                    />
                    <NavItem
                        icon="fa fa-plus"
                        text="New Todo" 
                        link="/todo/create"
                    />
                </ul>
            </div>
        </>
    );
}
