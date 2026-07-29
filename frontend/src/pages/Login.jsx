import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Login user
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            // Save access token
            localStorage.setItem(
                "accessToken",
                response.data.accessToken
            );

            // Fetch logged in user
            const me = await api.get("/auth/me");

            // Save user in AuthContext
            setUser(me.data);

            // Go to Home
            navigate("/");

        } catch (error) {
            console.error(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <div className="w-full max-w-md rounded-2xl bg-gray-900 p-8 shadow-xl border border-gray-800">

                <h1 className="text-3xl font-bold text-white text-center">
                    PicTale
                </h1>

                <p className="text-gray-400 text-center mt-2">
                    Welcome Back
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <div>
                        <label className="block text-gray-300 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="mt-6 text-center text-gray-400">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-500 hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;