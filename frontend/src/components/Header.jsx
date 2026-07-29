import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error(error.response?.data || error.message);
        } finally {
            logout();
            navigate("/login");
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                <Link
                    to="/"
                    className="text-2xl font-bold text-white"
                >
                    PicTale
                </Link>

                <nav className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="text-gray-300 hover:text-white transition"
                    >
                        Home
                    </Link>

                    {user ? (
                        <>
                            <Link
                                to="/create"
                                className="text-gray-300 hover:text-white transition"
                            >
                                Create Post
                            </Link>

                            <span className="text-white font-medium">
                                Welcome, {user.username}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-300 hover:text-white transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </nav>

            </div>
        </header>
    );
}

export default Header;