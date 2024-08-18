
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';


const Register = () => {
    const navigate = useNavigate()
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")

    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        console.log(name, photo, email, password, confirmPassword);

        if (password.length < 6) {
            setError('password must be 6 characters')
            return
        }
        if (password !== confirmPassword) {
            setError("password didn't match")
            return
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z]).{2,}$/.test(password)) {
            setError('password must use in one uppercase and lowercase')
            return
        }
        setError('')

        createUser(email, password)
            .then(result => {
                console.log(result.user)
                updateUserProfile(name, photo)
                    .then(() => {
                        navigate(location?.state ? location.state : '/home')
                        e.target.reset()
                        toast.success('Successfully create user!')
                    })
            })
            .catch(error => {
                console.error(error)
            })
    }
    return (
        <div>
            <Helmet>
                <title>ProductPlus | Register</title>
            </Helmet>
            <div className="hero bg-cover bg-base-200 container mx-auto rounded-t-xl pt-16">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center">
                        <img src={"https://i.ibb.co/nkdJK8M/Security.webp"} alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl animate__animated animate__backInUp">
                        <h1 className="text-4xl text-center font-bold animate__animated animate__backInLeft">Create an account</h1>
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Enter your name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Photo URL</span>
                                </label>
                                <input type="text" name="photo" placeholder="Enter your photo url" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Enter your email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered w-full"
                                        required />
                                    <samp className="absolute top-4 right-3" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                        }
                                    </samp>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Confirm Password</span>
                                </label>

                                <div className="relative">
                                    <input type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="password"
                                        className="input input-bordered w-full"
                                        required />
                                    <samp className="absolute top-4 right-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {
                                            showConfirmPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                        }
                                    </samp>
                                </div>
                                {
                                    error && <small className="text-red-800">{error}</small>
                                }
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#59f30c] font-bold">Register</button>
                            </div>
                        </form>
                        <div className="text-center p-3">
                            <p className="font-bold">Already have an account? <Link to='/'><u className="font-bold text-[#0716eb]">Login</u></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
