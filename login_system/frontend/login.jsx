import React from "react"; 
import { useState } from "react";
import { auth, provider, signInWithPopup } from "./firebase";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    async function handleLogin() {
        const resp = await fetch("https://ir-punjabi-jutti-website-login.onrender.com/api/auth/login", {
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
    const handleGoogleLogin = async () => {
    try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Send user info to your backend to save in MongoDB
    const res = await fetch("https://ir-punjabi-jutti-website-login.onrender.com/api/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
      }),
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/"; // redirect to home after login
    }
    } catch (err) {
        console.error("Google login failed:", err.message);
        alert("Google login failed. Please try again.");
    }
    };

    return (
        <div className="login-page">
            <div className="login">
                <h2>Login</h2>
                <input placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input placeholder="Password" type="password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <div className="login_actions">
                    <button onClick={handleLogin}>Login</button>
                    <div className="login_divider"><span>or</span></div>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="login_google_btn"
                    >
                        <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                            width="18"
                        />
                        Continue with Google
                    </button>
                </div>
                <p>{message}</p>
            </div>
        </div>
    );
}