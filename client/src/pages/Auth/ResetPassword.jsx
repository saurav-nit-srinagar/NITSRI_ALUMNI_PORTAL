import { account } from "../../config/appwrite"
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Meta from "../../components/Meta/Meta";


const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
    const [loading, setLoading] = useState(false);

    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword === "" || confirmPassword === "") {
            toast.error("Please enter your password");
            return;
        } else if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const res = await account.updateRecovery(userId, secret, newPassword, confirmPassword);
            toast.success("Password updated successfully!");
            setIsPasswordUpdated(true);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            setConfirmPassword("");
            setNewPassword("");
        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen">
            <Meta title="Reset Password | Alumni NITSGR" />
            <div className="lg:w-[28rem] md:w-[28rem] w-[90%] border-gray-700 border p-8 rounded-3xl bg-[#0c0c0c]">
                <div className="flex items-center justify-center">
                    <img src="/images/logo.svg" alt="logo" className="h-14 mt-1 w-auto" height={40} width={150} />
                </div>
                <div>
                    <h1 className="text-center text-xl font-semibold leading-normal py-6">
                        Set New Password
                    </h1>
                </div>

                <form onSubmit={handleResetPassword} className="mb-5">
                    <div className="flex relative flex-col space-y-2">
                        <label className="text-lg">New Password <span className="text-red-500">*</span></label>
                        <input
                            className="py-2.5 px-5 rounded-xl bg-[#1b1b1b] text-gray-200"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            autoComplete="password"
                            placeholder="Enter Password"
                            required
                            maxLength={16}
                            minLength={8}
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                        />
                        <div className="absolute bottom-3 right-4">
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

                    <div className="flex relative flex-col space-y-2">
                        <label className="text-lg">Confirm Password <span className="text-red-500">*</span></label>
                        <input
                            className="py-2.5 px-5 rounded-xl bg-[#1b1b1b] text-gray-200"
                            type={showConfirmPassword ? "text" : "password"}
                            name="password"
                            autoComplete="password"
                            placeholder="Enter Password"
                            required
                            maxLength={16}
                            minLength={8}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                        <div className="absolute bottom-3 right-4">
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

                    <button disabled={loading} type="submit" className="py-2.5 px-5 rounded-xl bg-[#4B164C] hover:bg-black focus:bg-gray-600 text-white font-bold w-full mt-6">
                        {loading ? "Resetting Password..." : "Submit"}
                    </button>
                </form>

                {
                    isPasswordUpdated ?
                        <p className="text-center mt-8">
                            Password Updated Successfully! <br />
                            Now you can login to use our services.
                        </p>
                        : null
                }

                <Link to="/signin" className="m-auto pt-0">
                    <p className="text-sky-500 text-center">Sign In</p>
                </Link>
            </div>
        </div>
    )
}

export default ResetPassword