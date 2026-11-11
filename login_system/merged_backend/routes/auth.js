const express = require("express");
const router = express.Router();
const User = require("../module/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const normEmail = (e) => String(e || "").trim().toLowerCase();
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const makeToken = (user) => jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1d" });

// Finds a user by email, ignoring upper/lower case (so accounts created before
// emails were lower-cased are still found).
const findByEmail = (email) =>
    User.findOne({ email: new RegExp(`^${escapeRegex(email)}$`, "i") });

// POST /api/auth/google-login   (also reachable as /api/google-login)
router.post("/google-login", async (req, res) => {
    try {
        const { name, photo, uid } = req.body;
        const email = normEmail(req.body.email);
        if (!email || !uid) return res.status(400).json({ success: false, message: "Missing Google account details" });

        let user = await findByEmail(email);
        if (!user) {
            const hashedPassword = await bcrypt.hash(uid, 11); // uid as placeholder password
            user = new User({
                name: name || email.split("@")[0],
                email,
                password: hashedPassword,
                photo: photo || "",
                uid,
                loginType: "google",
            });
            await user.save();
        }

        res.json({ success: true, token: makeToken(user), user: { name: user.name, email: user.email } });
    } catch (err) {
        console.error("Google login error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
    try {
        const name = String(req.body.name || "").trim();
        const email = normEmail(req.body.email);
        const password = String(req.body.password || "");

        if (!name || !email || !password) return res.status(400).json({ message: "Please fill in name, email and password" });
        if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: "Please enter a valid email" });
        if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });

        const exist = await findByEmail(email);
        if (exist) {
            return res.status(400).json({
                message: exist.loginType === "google"
                    ? "This email is already registered with Google. Use 'Continue with Google'."
                    : "User already exists. Please login.",
            });
        }

        const hashpassword = await bcrypt.hash(password, 11);
        await new User({ name, email, password: hashpassword }).save();
        res.status(201).json({ message: "Account created! You can login now." });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error, please try again" });
    }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
    try {
        const identifier = String(req.body.email || "").trim();
        const password = String(req.body.password || "");
        if (!identifier || !password) return res.status(400).json({ message: "Please enter email and password" });

        // Email is the normal way in; a name (no "@") is still accepted like before.
        const user = identifier.includes("@")
            ? await findByEmail(identifier)
            : await User.findOne({ name: identifier });

        if (!user) return res.status(400).json({ message: "No account found with this email. Please sign up first." });

        if (user.loginType === "google") {
            return res.status(400).json({ message: "This account uses Google. Please click 'Continue with Google'." });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Wrong password" });

        res.json({ token: makeToken(user), user: { name: user.name, email: user.email } });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error, please try again" });
    }
});

module.exports = router;
