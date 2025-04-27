import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Meta from "../../components/Meta/Meta";
import { useForm } from 'react-hook-form';

const Register = () => {
    const { handleSignUp } = useAuth();
    const { register, reset, handleSubmit, formState: { errors } } = useForm({ trim: true });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    const [accAlreadyExist, setAccAlreadyExists] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);

        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match.");
            return reset();
        }

        try {
            await handleSignUp({
                email: data.email,
                password: data.password,
                name: data.name
            });
            setIsAccountCreated(true);
            toast.success("Registered successfully.");
        } catch (error) {
            if (error.message === "A user with the same id, email, or phone already exists in this project.") {
                setAccAlreadyExists(true);
            }
            toast.error(error.message);
        }
        finally {
            setLoading(false);
            reset();
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Meta title="Sign Up | Alumni NITSGR" />
            {
                accAlreadyExist &&
                <div className="flex items-center justify-center flex-col max-w-lg text-center">
                    <div className="flex items-center justify-center">
                        <img src="/images/logo.svg" alt="logo" className="h-14 mt-1 w-auto" height={40} width={150} />
                    </div>

                    <p className="text-white text-lg pt-6">
                        A user with the provided email id already exists.
                    </p>

                    <p className="py-5">
                        Create account with new <Link onClick={() => {
                            resetForm();
                            setAccAlreadyExists(false);
                        }} to="/signup">
                            <span className="text-sky-500">
                                Email Id
                            </span>.
                        </Link>
                    </p>

                    <Link to="/forgot-password">
                        <p className="text-sky-500">
                            Forgot Password ?
                        </p>
                    </Link>
                </div>
            }

            {isAccountCreated ?
                <div className="flex items-center justify-center flex-col max-w-lg">
                    <img src="/images/logo.svg" alt="logo" className="h-14 mt-1 w-auto" height={40} width={150} />
                    <h3 className="text-xl font-semibold pt-5">Alumni Website NITSGR</h3>
                    <h1 className="text-3xl font-bold px-3 text-sky-500 pt-10">Account Created!</h1>
                    <p className="text-center mt-1">
                        Verification link has been sent to your email.
                        <br />Please verify your email to login.
                    </p>

                    <p className="text-center mt-1">
                        If you don't receive the email within a few minutes, <br />please check your spam folder.
                    </p>

                    <p className="text-center mt-4">
                        If already verified, click on the button below to login.
                    </p>

                    <Link to="/signin" className="mt-5">
                        <button className="text-white bg-[#4B164C] hover:bg-black focus:bg-gray-600 rounded-xl py-2.5 px-12">
                            Login
                        </button>
                    </Link>
                </div>
                :
                !accAlreadyExist && <div className="lg:w-[28rem] md:w-[28rem] sm:w-[90%] w-[95%] border-gray-700 border py-8 lg:px-8 md:px-7 px-4 rounded-3xl bg-[#0c0c0c]">
                    <h1 className="text-3xl font-bold mb-3 px-3">Sign Up</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 px-3">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Email</label>
                            <input
                                autoComplete="email"
                                autoFocus={true}
                                type="email"
                                id="email"
                                className="py-2 px-5 rounded-xl bg-[#1b1b1b] text-gray-200"
                                placeholder="abc@tesla.co.in"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && <p className="text-rose-500">{errors.email.message}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Name</label>
                            <input
                                autoComplete="name"
                                type="text"
                                id="name"
                                className="py-2 px-5 rounded-xl bg-[#1b1b1b] text-gray-200"
                                placeholder="John Doe"
                                {
                                ...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Name should be at least 3 characters"
                                    },
                                })
                                }
                            />
                            {
                                errors.name && <p className="text-rose-500">{errors.name.message}</p>
                            }
                        </div>

                        <div className="flex relative flex-col gap-1">
                            <label htmlFor="password">Password</label>
                            <input
                                autoComplete="password"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="py-2 px-5 rounded-xl bg-[#1b1b1b] text-gray-200"
                                placeholder="Enter Password"
                                {
                                ...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password should be at least 8 characters"
                                    },
                                    maxLength: {
                                        value: 32,
                                        message: "Password should not be greater than 32 characters"
                                    }
                                })
                                }
                            />
                            {
                                errors.password && <p className="text-rose-500">{errors.password.message}</p>
                            }
                            <div className="absolute top-10 right-4">
                                {showPassword ? (
                                    <FaEye
                                        size={22}
                                        className="text-gray-400 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                ) : (
                                    <FaEyeSlash
                                        size={22}
                                        className="text-gray-400 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex relative flex-col gap-1">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                autoComplete="password"
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                className="py-2 px-5 rounded-xl bg-[#1b1b1b] text-gray-200"
                                placeholder="Confirm Password"
                                {
                                ...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password should be at least 8 characters"
                                    },
                                    maxLength: {
                                        value: 32,
                                        message: "Password should not be greater than 32 characters"
                                    }
                                })
                                }
                            />
                            {
                                errors.confirmPassword && <p className="text-rose-500">{errors.confirmPassword.message}</p>
                            }
                            <div className="absolute top-10 right-4">
                                {showConfirmPassword ? (
                                    <FaEye
                                        size={22}
                                        className="text-gray-400 cursor-pointer"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />
                                ) : (
                                    <FaEyeSlash
                                        size={22}
                                        className="text-gray-400 cursor-pointer"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />
                                )}
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="py-2.5 mt-3 px-5 rounded-xl bg-[#4B164C] hover:bg-black focus:bg-gray-600 disabled:bg-gray-600 text-white font-semibold"
                            type="submit"
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>

                        <p className="text-center mt-5">
                            Already have an account?{" "}
                            <Link to="/signin" style={{ textDecoration: "none", color: "skyblue" }} className="text-sky-500">
                                Login
                            </Link>
                        </p>

                        <Link to="/" className="flex items-center justify-center -mt-3">
                            <button className="text-rose-500">
                                Skip for now
                            </button>
                        </Link>
                    </form>
                </div>}
        </div>
    );
};

export default Register;