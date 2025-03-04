import axios from "axios";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo/logo.png'

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [verify, setVerify] = useState(null);
    const navigate = useNavigate();
    console.log(formData);
    console.log(verify);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            alert("Please fill in all fields");
            return;
        }
        try {
            const res = await axios.post(
                "http://localhost:8888/api/auth/login",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(res.data);
            setVerify(null);
        } catch (err) {
            console.log(err.response?.data || err);
            setVerify(err.response?.data);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleVerify = () => {
        navigate("/otp-verification", {
            state: { email: formData.email },
        });
    };

    return (
        <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
            <div className="flex flex-col gap-6 max-w-sm w-full px-8 py-10 rounded-lg shadow-lg shadow-gray-300 bg-white text-sm">
            <div className="h-20 flex justify-center items-center">
                <img src={logo} alt="" className="h-full"/>
                </div> 
                <h1 className="text-purple-800 font-semibold text-3xl text-center">
                    Sign In
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            id="email"
                            className="w-full outline-none border-2 border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:border-none focus:ring-purple-500 transition-all"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 transform origin-top-left bg-white px-1"
                            style={{
                                transform: formData.email
                                    ? "translateY(-1.4rem)"
                                    : "translateY(0)",
                                fontSize: formData.email ? "0.7rem" : "0.9rem",
                            }}
                        >
                            Email
                        </label>
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            id="password"
                            className="w-full outline-none border-2 border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:border-none focus:ring-purple-500 transition-all"
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 transform origin-top-left bg-white px-1"
                            style={{
                                transform: formData.password
                                    ? "translateY(-1.4rem)"
                                    : "translateY(0)",
                                fontSize: formData.password
                                    ? "0.7rem"
                                    : "0.9rem",
                            }}
                        >
                            Password
                        </label>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex justify-between w-full">
                        <span className="text-purple-800 font-medium text-sm hover:underline cursor-pointer text-right">
                            Forgot Password?
                        </span>
                        {verify?.message?.isVerified==false && (
                            <span
                                className="text-purple-800 font-medium text-sm hover:underline cursor-pointer"
                                onClick={handleVerify}
                            >
                                Verify Now
                            </span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-800 border-2 border-purple-700 text-white py-2 rounded-3xl font-semibold transition-all duration-500 ease-in-out hover:bg-white hover:text-purple-700"
                    >
                        Sign in
                    </button>
                </form>

                {/* Separator with OR */}
                <div className="flex items-center justify-center">
                    <div className="border-t border-gray-300 w-16"></div>
                    <span className="px-4 text-gray-500">OR</span>
                    <div className="border-t border-gray-300 w-16"></div>
                </div>

                {/* Google Sign-In Button */}
                <button className="w-full text-purple-700 bg-white border-2 border-purple-700 py-2 rounded-3xl flex items-center justify-center gap-2 font-semibold transition-all duration-500 ease-in-out hover:bg-purple-700 hover:text-white">
                    <FcGoogle className="text-lg" />
                    <span>Sign in with Google</span>
                </button>
            </div>
            <div className="flex gap-3 text-purple-700 items-center justify-center">
                <span className="text-sm">New to Hostel?</span>
                <Link to={'/register'}>
                <span className="font-semibold text-sm">Join Now</span>
                </Link>
            </div>
        </div>
    );
};

export default Login;
