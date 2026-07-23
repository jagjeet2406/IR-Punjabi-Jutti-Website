import React from "react"; 
import { useState } from "react";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    async function handleSignup() {
        const resp = await fetch("https://YOUR-BACKEND.onrender.com/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        const data = await resp.json();
        setMessage(data.message);
    }

    return (
        <div className="login">
            <h2>Signup</h2>
            <input placeholder="Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Password" type="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button style={{border:"1px solid black",height:"2rem",width:"5rem",borderRadius:"2rem"}} onClick={handleSignup}>Signup</button>
            <p>{message}</p>
        </div>
    );
}