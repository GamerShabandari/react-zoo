import { Link } from "react-router-dom";

import "./NotFound.css";

export function NotFound() {
    return (<>
        <div className="container">
            <div>OOPS! Nu blev det lite fel i adressfältet...</div>
            <Link to={"/"} className="btn">Tillbaka till huvudsidan</Link>
        </div>
    </>)
}