import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/otp.css'; 

export default function Otp() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function handleRequestOtp(){
        try {
            const response = await fetch("http://127.0.0.1:8000/api/request-otp/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage("OTP sent to your email.");
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message || "Failed to request OTP."}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    async function handleVerifyOtp(){
        try {
            const response = await fetch("http://127.0.0.1:8000/api/verify-otp/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp }),
            });

            if (response.ok) {
                setMessage("OTP verified successfully.");
                navigate('/login')
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message || "Failed to verify OTP."}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="otp-container">
            <h2>OTP Verification</h2>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                />
            </div>
            <button className="otp-button" onClick={handleRequestOtp}>
                Request OTP
            </button>
            <div className="form-group" style={{ marginTop: "20px" }}>
                <label>OTP:</label>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                />
            </div>
            <button className="otp-button" onClick={handleVerifyOtp}>
                Verify OTP
            </button>
            {message && (
                <div className={`message-container ${message.includes("Error") ? "error" : ""}`}>
                    {message}
                </div>
            )}
        </div>
    );
}
