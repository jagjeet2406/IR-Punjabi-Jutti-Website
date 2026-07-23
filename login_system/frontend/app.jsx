import React  from "react";
import ReactDOM from "react-dom/client";
import Signup from "./signup";
import Login from "./login";


function App(){
    return(
        <>
        <Login></Login>
        <Signup></Signup>
        </>
    )
}
ReactDOM.createRoot(document.getElementById("display")).render(<App></App>);