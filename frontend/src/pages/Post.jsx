import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Post() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuth();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);

    const [editing, setEditing] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // Crop position
    const [position, setPosition] = useState({
        x: 50,
        y: 50,
    });

    const [imageLoaded, setImageLoaded] = useState(false);
    const [dragging, setDragging] = useState(false);

    const cropRef = useRef(null);

    const dragStart = useRef({
        mouseX: 0,
        mouseY: 0,
        imageX: 50,
        imageY: 50,
    });


    // =========================
    // GET POST
    // =========================

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await api.get(`/post/${id}`);

                const data = response.data;

                setPost(data);

                setTitle(data.title);
                setContent(data.content);
                setImageUrl(data.imageUrl);

                // Load existing crop
                setPosition({
                    x: data.crop?.x ?? 50,
                    y: data.crop?.y ?? 50,
                });

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


    // =========================
    // IMAGE LOAD
    // =========================

    const handleImageLoad = () => {
        setImageLoaded(true);
    };


    // =========================
    // START DRAGGING
    // =========================

    const handleMouseDown = (e) => {
        if (!imageLoaded) return;

        e.preventDefault();

        setDragging(true);

        dragStart.current = {
            mouseX: e.clientX,
            mouseY: e.clientY,
            imageX: position.x,
            imageY: position.y,
        };
    };


    // =========================
    // DRAG IMAGE
    // =========================

    const handleMouseMove = (e) => {
        if (!dragging || !cropRef.current) return;

        const rect = cropRef.current.getBoundingClientRect();

        const deltaX =
            e.clientX - dragStart.current.mouseX;

        const deltaY =
            e.clientY - dragStart.current.mouseY;

        const movementX =
            (deltaX / rect.width) * 100;

        const movementY =
            (deltaY / rect.height) * 100;

        let newX =
            dragStart.current.imageX - movementX;

        let newY =
            dragStart.current.imageY - movementY;

        newX = Math.max(
            0,
            Math.min(100, newX)
        );

        newY = Math.max(
            0,
            Math.min(100, newY)
        );

        setPosition({
            x: newX,
            y: newY,
        });
    };


    const handleMouseUp = () => {
        setDragging(false);
    };


    // =========================
    // IMAGE URL CHANGE
    // =========================

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);

        setImageLoaded(false);

        // New image starts from center
        setPosition({
            x: 50,
            y: 50,
        });
    };


    // =========================
    // DELETE
    // =========================

    const handleDelete = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeleting(true);

            await api.delete(`/post/${id}`);

            navigate("/");

        } catch (error) {
            console.error(
                error.response?.data || error.message
            );
        } finally {
            setDeleting(false);
        }
    };


    // =========================
    // UPDATE
    // =========================

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setUpdating(true);

            const response = await api.put(`/post/${id}`, {
                title,
                content,
                imageUrl,

                crop: {
                    x: position.x,
                    y: position.y,
                },
            });

            console.log(response.data);

            setPost({
                ...post,
                title,
                content,
                imageUrl,

                crop: {
                    x: position.x,
                    y: position.y,
                },
            });

            setEditing(false);

        } catch (error) {
            console.error(
                error.response?.data || error.message
            );
        } finally {
            setUpdating(false);
        }
    };


    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <p className="text-gray-400">
                    Loading story...
                </p>
            </div>
        );
    }


    // =========================
    // NOT FOUND
    // =========================

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


    const isAuthor =
        user?._id === post.author?._id;


    return (
        <article className="mx-auto max-w-4xl px-6 py-10">

            <Link
                to="/"
                className="mb-8 inline-block text-gray-400 transition hover:text-white"
            >
                ← Back to Home
            </Link>


            {editing ? (

                // =====================================
                // EDIT MODE
                // =====================================

                <form
                    onSubmit={handleUpdate}
                    className="rounded-2xl border border-gray-800 bg-gray-900 p-6"
                >

                    <h1 className="mb-6 text-3xl font-bold text-white">
                        Edit Post
                    </h1>


                    {/* IMAGE URL */}

                    <div className="mb-5">

                        <label className="mb-2 block text-gray-300">
                            Image URL
                        </label>

                        <input
                            type="url"
                            value={imageUrl}
                            onChange={handleImageUrlChange}
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />

                    </div>


                    {/* CROP EDITOR */}

                    {imageUrl && (

                        <div className="mb-6">

                            <label className="mb-2 block text-gray-300">
                                Position your image
                            </label>

                            <p className="mb-3 text-sm text-gray-500">
                                Drag the image to choose which part
                                appears in your post.
                            </p>

                            <div
                                ref={cropRef}
                                className="relative mx-auto aspect-400/224 w-full max-w-xl overflow-hidden rounded-xl border-2 border-gray-700 bg-gray-950 select-none"
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                            >

                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    onLoad={handleImageLoad}
                                    onMouseDown={handleMouseDown}
                                    draggable="false"
                                    className={`h-full w-full object-cover ${
                                        imageLoaded
                                            ? dragging
                                                ? "cursor-grabbing"
                                                : "cursor-grab"
                                            : ""
                                    }`}
                                    style={{
                                        objectPosition:
                                            `${position.x}% ${position.y}%`,
                                    }}
                                />

                            </div>

                            <p className="mt-2 text-center text-sm text-gray-500">
                                Drag the image inside the box
                            </p>

                        </div>

                    )}


                    {/* TITLE */}

                    <div className="mb-5">

                        <label className="mb-2 block text-gray-300">
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />

                    </div>


                    {/* STORY */}

                    <div className="mb-6">

                        <label className="mb-2 block text-gray-300">
                            Story
                        </label>

                        <textarea
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            required
                            rows={10}
                            className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            disabled={updating || !imageLoaded}
                            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {updating
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                            className="rounded-lg bg-gray-700 px-5 py-3 font-semibold text-white hover:bg-gray-600"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            ) : (

                // =====================================
                // VIEW MODE
                // =====================================

                <>

                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="max-h-600px w-full rounded-2xl object-cover"
                        style={{
                            objectPosition:
                                `${post.crop?.x ?? 50}% ${post.crop?.y ?? 50}%`,
                        }}
                    />


                    <div className="mt-8">

                        <div className="flex items-start justify-between gap-6">

                            <div>

                                <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                                    {post.title}
                                </h1>

                                <p className="mt-4 text-sm text-gray-500">
                                    By {post.author?.username}
                                </p>

                            </div>


                            {isAuthor && (

                                <div className="flex shrink-0 gap-2">

                                    <button
                                        onClick={() =>
                                            setEditing(true)
                                        }
                                        className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={handleDelete}
                                        disabled={deleting}
                                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                                    >
                                        {deleting
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>

                                </div>

                            )}

                        </div>


                        <div className="my-8 h-px bg-gray-800"></div>


                        <div className="whitespace-pre-wrap text-lg leading-8 text-gray-300">
                            {post.content}
                        </div>

                    </div>

                </>

            )}

        </article>
    );
}

export default Post;