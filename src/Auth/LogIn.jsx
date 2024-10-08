
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { toast } from 'react-hot-toast';

const LogIn = () => {
    const { signIn, googleLogIn } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogIn = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);
        setError('')
        signIn(email, password)
            .then(() => {
                navigate(location?.state ? location.state : '/')
                toast.success('LogIn Successful!')
                e.target.reset()

            })
            .catch(error => {
                setError('invalid-credential')
                console.error(error)
            })
    }


    const handleGoogle = async () => {
        try {
            await googleLogIn()
            navigate('/home');
            toast.success('signUp successfully')
        }
        catch (err) {
            // console.log(err);
            toast.error(err.message)
        }
    }

    return (
        <div>
            <Helmet>
                <title> ProductPlus | LogIn</title>
            </Helmet>
            <div className="hero container mx-auto pt-16">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center">
                        <img src={"https://i.ibb.co/nkdJK8M/Security.webp"} alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 animate__animated animate__backInUp">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold animate__animated animate__backInDown">Login now!</h1>
                        </div>
                        <form onSubmit={handleLogIn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
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
                            {
                                error && <small className="text-red-800">{error}</small>
                            }
                            <div className="form-control mt-6">
                                <button className="btn font-bold bg-[#59f30c]">Login</button>
                            </div>
                        </form>
                        <div className="text-center p-3">
                            <p className="font-bold">Don’t have an account? <Link to='/register'><u className="font-bold text-[#0a36e7]">Create an account</u></Link></p>
                        </div>
                        <div className="space-y-2 p-3">
                            <div className="divider">Or</div>
                            <button onClick={handleGoogle} className="border border-blue-800 btn w-full text-blue-600 font-bold animate__animated animate__backInLeft"><img className="w-10" src={'https://i.ibb.co/F8yRqqk/google-icon-1.png'} alt="" />Continue with Google</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LogIn;
