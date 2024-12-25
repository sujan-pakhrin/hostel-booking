import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        f_name: "",
        l_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: "",
        gender: "",
    });
    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post("http://localhost:8888/api/user", formData, {
                headers: {
                    "Content-Type": "application/json", // ensure content type matches what the API expects
                },
            })
            .then((res) => {
                console.log(res.data);
                navigate("/otp-verification", {
                    state: { email: formData.email },
                });
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="flex flex-col gap-5 items-center justify-center min-h-screen mx-4">
            <div className="flex flex-col gap-6 max-w-sm md:max-w-md lg:max-w-lg w-full px-8 py-7 rounded-lg shadow-lg shadow-gray-300 bg-white text-sm">
                <h1 className="text-purple-800 font-semibold text-3xl text-center">
                    Sign Up
                </h1>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* First Name and Last Name */}
                    <div className="flex gap-3">
                        <div className="relative w-full">
                            <input
                                type="text"
                                name="f_name"
                                value={formData.f_name}
                                onChange={handleChange}
                                id="f_name"
                                className="w-full outline-none border-2 border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:border-none focus:ring-purple-500 transition-all"
                            />
                            <label
                                htmlFor="f_name"
                                className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 transform origin-top-left bg-white px-1"
                                style={{
                                    transform: formData.f_name
                                        ? "translateY(-1.4rem)"
                                        : "translateY(0)",
                                    fontSize: formData.f_name
                                        ? "0.75rem"
                                        : "0.9rem",
                                }}
                            >
                                First Name
                            </label>
                        </div>

                        <div className="relative w-full">
                            <input
                                type="text"
                                name="l_name"
                                value={formData.l_name}
                                onChange={handleChange}
                                id="l_name"
                                className="w-full outline-none border-2 border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:border-none focus:ring-purple-500 transition-all"
                            />
                            <label
                                htmlFor="l_name"
                                className="absolute left-4 text-gray-500 text-sm transition-all duration-200 transform origin-top-left top-3 bg-white px-1"
                                style={{
                                    transform: formData.l_name
                                        ? "translateY(-1.4rem)"
                                        : "translateY(0)",
                                    fontSize: formData.l_name
                                        ? "0.75rem"
                                        : "0.9rem",
                                }}
                            >
                                Last Name
                            </label>
                        </div>
                    </div>

                    {/* Email */}
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
                            className="absolute left-4 top-3 bg-white px-1 text-gray-500 text-sm transition-all duration-200 transform origin-top-left"
                            style={{
                                transform: formData.email
                                    ? "translateY(-1.4rem)"
                                    : "translateY(0)",
                                fontSize: formData.email ? "0.75rem" : "0.9rem",
                            }}
                        >
                            Email
                        </label>
                    </div>

                    {/* Address */}
                    <div className="relative">
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            id="address"
                            className="w-full outline-none border-2 border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:border-none focus:ring-purple-500 transition-all"
                        />
                        <label
                            htmlFor="address"
                            className="absolute left-4 top-3 bg-white px-1 text-gray-500 text-sm transition-all duration-200 transform origin-top-left"
                            style={{
                                transform: formData.address
                                    ? "translateY(-1.4rem)"
                                    : "translateY(0)",
                                fontSize: formData.address
                                    ? "0.75rem"
                                    : "0.9rem",
                            }}
                        >
                            Address
                        </label>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            id="phone"
                            className="w-full outline-none border-2 border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:border-none focus:ring-purple-500 transition-all"
                        />
                        <label
                            htmlFor="phone"
                            className="absolute left-4 top-3 bg-white px-1 text-gray-500 text-sm transition-all duration-200 transform origin-top-left"
                            style={{
                                transform: formData.phone
                                    ? "translateY(-1.4rem)"
                                    : "translateY(0)",
                                fontSize: formData.phone ? "0.75rem" : "0.9rem",
                            }}
                        >
                            Phone Number
                        </label>
                    </div>

                    {/* Password */}
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
                            className="absolute left-4 top-3 bg-white px-1 text-gray-500 text-sm transition-all duration-200 transform origin-top-left"
                            style={{
                                transform: formData.password
                                    ? "translateY(-1.4rem)"
                                    : "translateY(0)",
                                fontSize: formData.password
                                    ? "0.75rem"
                                    : "0.9rem",
                            }}
                        >
                            Password
                        </label>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            id="confirmPassword"
                            className="w-full outline-none border-2 border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:border-none focus:ring-purple-500 transition-all"
                        />
                        <label
                            htmlFor="confirmPassword"
                            className="absolute left-4 top-3 bg-white px-1 text-gray-500 text-sm transition-all duration-200 transform origin-top-left"
                            style={{
                                transform: formData.confirmPassword
                                    ? "translateY(-1.4rem)"
                                    : "translateY(0)",
                                fontSize: formData.confirmPassword
                                    ? "0.75rem"
                                    : "0.9rem",
                            }}
                        >
                            Confirm Password
                        </label>
                    </div>

                    {/* Gender Selection */}
                    <div className="flex gap-4 items-center">
                        <label className="text-sm text-gray-600">Gender:</label>
                        <div className="flex gap-3 items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                id="male"
                                checked={formData.gender === "male"}
                                onChange={handleChange}
                                className="form-radio"
                            />
                            <label
                                htmlFor="male"
                                className="text-sm text-gray-600"
                            >
                                Male
                            </label>
                        </div>
                        <div className="flex gap-3 items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                id="female"
                                checked={formData.gender === "female"}
                                onChange={handleChange}
                                className="form-radio"
                            />
                            <label
                                htmlFor="female"
                                className="text-sm text-gray-600"
                            >
                                Female
                            </label>
                        </div>
                        <div className="flex gap-3 items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                id="other"
                                checked={formData.gender === "other"}
                                onChange={handleChange}
                                className="form-radio"
                            />
                            <label
                                htmlFor="other"
                                className="text-sm text-gray-600"
                            >
                                Other
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-800 border-2 border-purple-700 text-white py-2 rounded-3xl font-semibold transition-all duration-500 ease-in-out hover:bg-white hover:text-purple-700"
                    >
                        Sign up
                    </button>
                </form>

                <div className="flex items-center justify-center">
                    <div className="border-t border-gray-300 w-16"></div>
                    <span className="px-4 text-gray-500">OR</span>
                    <div className="border-t border-gray-300 w-16"></div>
                </div>

                <button className="w-full text-purple-700 bg-white border-2 border-purple-700 py-2 rounded-3xl flex items-center justify-center gap-2 font-semibold transition-all duration-500 ease-in-out hover:bg-purple-700 hover:text-white">
                    <FcGoogle className="text-lg" />
                    <span>Sign up with Google</span>
                </button>
            </div>

            <div className="flex gap-3 text-purple-700 items-center justify-center">
                <span className="text-sm">Already have an account?</span>
                <Link to={'/login'}>
                <span className="font-semibold text-sm">Sign In</span>
                </Link>
            </div>
        </div>
    );
};

export default Register;
