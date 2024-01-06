import {Link} from "react-router-dom";
import React from "react";

function PageNotFound() {
    return <div>
        error page- go to the home page:
        <Link to={"/"}>Home</Link>
    </div>

}

export default PageNotFound;