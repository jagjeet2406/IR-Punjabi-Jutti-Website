import React from "react"; 
import { useState } from "react";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    async function handleLogin() {
        const resp = await fetch("https://YOUR-BACKEND.onrender.com/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        const data = await resp.json();

        if (data.token) {
            localStorage.setItem("token", data.token); 
            setMessage(`Welcome ${data.user.name}!`);
        } else {
            setMessage(data.message);
        }
    }

    return (
        <div className="login" >
            <h2>Login</h2>
            <input placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Password" type="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button  style={{border:"1px solid black",height:"2rem",width:"5rem",borderRadius:"2rem",marginTop:"14rem"}} onClick={handleLogin}>Login</button>
            <p>{message}</p>
        </div>
    );
}