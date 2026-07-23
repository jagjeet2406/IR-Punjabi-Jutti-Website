import { Link, Outlet } from "react-router-dom";

export default function Kid() {
    return (
        <div className="kidhead">
            <nav className="head_kid">
                <Link to="gabru-collection">Little Gabru Collection</Link>
                <Link to="mutiyar-collection">Little Mutiyar Collection</Link>
            </nav>

            <Outlet />
        </div>
    );
}