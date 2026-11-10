require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");   // ← NEW
const app = express();
const nodemailer = require("nodemailer");

const allowedOrigins = [
  "https://irpunjabijutti.com",
  "https://www.irpunjabijutti.com",
  "http://localhost:1234",
  "http://localhost:3000",    // ← for admin portal local dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());

// Add this function
async function notifyOwner(customer, cartItems, totalAmount, paymentId) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const itemsList = cartItems
            .map(item => `  • ${item.name} x${item.quantity} = Rs.${Number(String(item.price).replace("₹", "").replace(",", "")) * item.quantity}`)
            .join("\n");

        await transporter.sendMail({
            from: `"IR Punjabi Jutti Orders" <${process.env.GMAIL_USER}>`,
            to: process.env.OWNER_EMAIL,
            subject: `🛍️ New Order — Rs.${totalAmount}`,
            text: `
NEW ORDER RECEIVED
IR Punjabi Jutti
─────────────────────────

Name    : ${customer.fullName}
Phone   : ${customer.phone}
Email   : ${customer.email || "Not provided"}

ADDRESS:
${customer.address}
${customer.city}, ${customer.state} - ${customer.pincode}

ITEMS:
${itemsList}

Shipping   : Rs. 0
TOTAL PAID : Rs. ${totalAmount}
Payment ID : ${paymentId}
Status     : PAID ✅

— IR Punjabi Jutti
            `.trim(),
        });

        console.log("✅ Order email sent to owner at", process.env.OWNER_EMAIL);
    } catch (err) {
        console.error("Email failed:", err.message);
    }
}

mongoose.connect(process.env.SERVER_KEY)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);    // ← NEW

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
