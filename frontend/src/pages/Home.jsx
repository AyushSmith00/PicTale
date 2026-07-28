import { useEffect } from "react";
import api from "../api/axios";

function Home() {

    useEffect(() => {

        const getMe = async () => {
            try {

                const response = await api.get("/auth/me");

                console.log(response.data);

            } catch (error) {

                console.error(error.response?.data || error.message);

            }
        };

        getMe();

    }, []);

    return (
        <div className="mx-auto max-w-7xl px-6 py-10">

            <section className="mb-10 text-center">

                <h1 className="text-5xl font-bold text-white">
                    Every Picture Has a Story
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
                    Discover amazing images shared by people around the world
                    and read the stories behind every moment.
                </p>

            </section>

            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                    <div className="mb-4 h-52 rounded-xl bg-gray-800"></div>

                    <h2 className="text-xl font-semibold text-white">
                        No Posts Yet
                    </h2>

                    <p className="mt-2 text-gray-400">
                        Once users start sharing stories, they'll appear here.
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                    <div className="mb-4 h-52 rounded-xl bg-gray-800"></div>

                    <h2 className="text-xl font-semibold text-white">
                        No Posts Yet
                    </h2>

                    <p className="mt-2 text-gray-400">
                        Start by creating your first post.
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                    <div className="mb-4 h-52 rounded-xl bg-gray-800"></div>

                    <h2 className="text-xl font-semibold text-white">
                        No Posts Yet
                    </h2>

                    <p className="mt-2 text-gray-400">
                        Your stories will inspire others.
                    </p>
                </div>

            </section>

        </div>
    );
}

export default Home;