import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await api.get("/post");

                setPosts(response.data.posts);

            } catch (error) {
                console.error(
                    error.response?.data || error.message
                );
            } finally {
                setLoading(false);
            }
        };

        getPosts();
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


            

            {loading ? (

                <h2 className="text-center text-xl text-gray-300">
                    Loading...
                </h2>

            ) : posts.length === 0 ? (

                

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">

                    <h2 className="text-2xl font-semibold text-white">
                        No Posts Yet
                    </h2>

                    <p className="mt-2 text-gray-400">
                        Be the first one to share your story.
                    </p>

                </div>

            ) : (

                

                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {posts.map((post) => (

                        <Link
                            key={post._id}
                            to={`/post/${post._id}`}
                            className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition duration-300 hover:-translate-y-1 hover:border-gray-700"
                        >

                            

                            <div className="overflow-hidden">

                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                                />

                            </div>


                            

                            <div className="p-5">

                                <h2 className="text-xl font-bold text-white">
                                    {post.title}
                                </h2>

                                <p className="mt-3 line-clamp-3 text-gray-400">
                                    {post.content}
                                </p>

                                <p className="mt-4 text-sm font-medium text-blue-500">
                                    Read full story →
                                </p>

                                <p className="mt-2 text-sm text-gray-500">
                                    By {post.author?.username}
                                </p>

                            </div>

                        </Link>

                    ))}

                </section>

            )}

        </div>
    );
}

export default Home;