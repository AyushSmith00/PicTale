import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";

function Post() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await api.get(`/post/${id}`);

                setPost(response.data);

            } catch (error) {
                console.error(
                    error.response?.data || error.message
                );
            } finally {
                setLoading(false);
            }
        };

        getPost();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <p className="text-gray-400">
                    Loading story...
                </p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center">

                <h1 className="text-2xl font-bold text-white">
                    Post not found
                </h1>

                <Link
                    to="/"
                    className="mt-4 text-blue-500 hover:underline"
                >
                    Back to Home
                </Link>

            </div>
        );
    }

    return (
        <article className="mx-auto max-w-4xl px-6 py-10">

            <Link
                to="/"
                className="mb-8 inline-block text-gray-400 transition hover:text-white"
            >
                ← Back to Home
            </Link>

            <img
                src={post.imageUrl}
                alt={post.title}
                className="max-h-600px w-full rounded-2xl object-cover"
            />

            <div className="mt-8">

                <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                    {post.title}
                </h1>

                <p className="mt-4 text-sm text-gray-500">
                    By {post.author?.username}
                </p>

                <div className="my-8 h-px bg-gray-800"></div>

                <div className="whitespace-pre-wrap text-lg leading-8 text-gray-300">
                    {post.content}
                </div>

            </div>

        </article>
    );
}

export default Post;