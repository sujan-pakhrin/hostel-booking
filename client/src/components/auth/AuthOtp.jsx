import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AuthOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location?.state || {};
    const [formData, setFormData] = useState({
        otp: "",
        email: email,
    });
    console.log(formData)
    const [timer, setTimer] = useState(30);  // Timer for OTP resend
    const [isResendDisabled, setIsResendDisabled] = useState(true);  // Disable resend button until timer ends

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8888/api/user/verify-otp",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );  
            if(res.data.success){
                navigate('/login');
            }
        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleResendOtp = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8888/api/user/resend-otp", 
                { email }, 
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(res.data);
            resetTimer();
        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        }
    };

    const resetTimer = () => {
        setTimer(30); 
        setIsResendDisabled(true); 
    };

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setIsResendDisabled(false);  // Enable the resend button once the timer hits 0
        }
    }, [timer]);

    return (
        <div className="flex flex-col gap-5 items-center justify-center min-h-screen mx-4">
            <div className="flex flex-col gap-6 max-w-sm md:max-w-md lg:max-w-lg w-full px-8 py-7 rounded-lg shadow-lg shadow-gray-300 bg-white text-sm">
                <h1 className="text-purple-800 font-semibold text-3xl text-center">
                    OTP Verification
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* OTP */}
                     <input
                            type="email"
                            name="email"
                            value={email}
                            id="email"
                            disabled
                            className="w-full outline-none border-2 border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:border-none focus:ring-purple-500 transition-all"
                        />
                    <div className="relative">
                        <input
                            type="number"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            id="otp"
                            class="w-full outline-none border-2 border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:border-none focus:ring-purple-500 transition-all appearance-none"
                            required
                        />
                        <label
                            htmlFor="otp"
                            className="absolute left-4 top-3 bg-white px-1 text-gray-500 text-sm transition-all duration-200 transform origin-top-left"
                            style={{
                                transform: formData.otp
                                    ? "translateY(-1.4rem)"
                                    : "translateY(0)",
                                fontSize: formData.otp ? "0.75rem" : "0.9rem",
                            }}
                        >
                            OTP
                        </label>
                    </div>

                    <button  
                        type="submit"
                        className="w-full bg-purple-800 border-2 border-purple-700 text-white py-2 rounded-3xl font-semibold transition-all duration-500 ease-in-out hover:bg-white hover:text-purple-700"
                    >
                        Verify
                    </button>
                </form>

                {/* Resend OTP */}
                <div className="text-center w-full">
                    <button
                        onClick={handleResendOtp}
                        disabled={isResendDisabled}
                        className={`${
                            isResendDisabled
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-purple-800 text-white"
                        } py-2 px-4 rounded-full text-sm w-full`}
                    >
                        {isResendDisabled
                            ? `Resend OTP in ${timer}s`
                            : "Resend OTP"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthOtp;
