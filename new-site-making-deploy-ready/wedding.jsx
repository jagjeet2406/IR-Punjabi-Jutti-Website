import { Link, Outlet } from "react-router-dom";

export default function Wedding() {
    return (
        <div className="weddinghead">
            <nav className="head_wedding">
                <Link to="groom-collection">Groom Collection</Link>
                <Link to="Bride-collection">Bride Collection</Link>
            </nav>

            <Outlet />
        </div>
    );
}