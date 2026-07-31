import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const [position, setPosition] = useState({
        x: 50,
        y: 50,
    });

    const [dragging, setDragging] = useState(false);

    const cropRef = useRef(null);

    const dragStart = useRef({
        mouseX: 0,
        mouseY: 0,
        imageX: 50,
        imageY: 50,
    });

    const navigate = useNavigate();

    const handleImageLoad = () => {
        setImageLoaded(true);

        setPosition({
            x: 50,
            y: 50,
        });
    };

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

    const handleMouseMove = (e) => {
        if (!dragging || !cropRef.current) return;

        const rect = cropRef.current.getBoundingClientRect();

        const deltaX = e.clientX - dragStart.current.mouseX;
        const deltaY = e.clientY - dragStart.current.mouseY;

       

        const movementX = (deltaX / rect.width) * 100;
        const movementY = (deltaY / rect.height) * 100;

        let newX = dragStart.current.imageX - movementX;
        let newY = dragStart.current.imageY - movementY;


        newX = Math.max(0, Math.min(100, newX));
        newY = Math.max(0, Math.min(100, newY));

        setPosition({
            x: newX,
            y: newY,
        });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await api.post("/post", {
                title,
                content,
                imageUrl,

                crop: {
                    x: position.x,
                    y: position.y,
                },
            });

            navigate("/");
        } catch (error) {
            console.error(
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl px-6 py-10">

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">

                <h1 className="text-3xl font-bold text-white">
                    Create a Post
                </h1>

                <p className="mt-2 text-gray-400">
                    Share your picture and the story behind it.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6"
                >

                    

                    <div>
                        <label className="mb-2 block text-gray-300">
                            Image URL
                        </label>

                        <input
                            type="url"
                            placeholder="Paste image address"
                            value={imageUrl}
                            onChange={(e) => {
                                setImageUrl(e.target.value);
                                setImageLoaded(false);
                            }}
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                   

                    {imageUrl && (
                        <div>

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
                                        objectPosition: `${position.x}% ${position.y}%`,
                                    }}
                                />

                            </div>

                            <p className="mt-2 text-center text-sm text-gray-500">
                                Drag the image inside the box
                            </p>

                        </div>
                    )}

                    

                    <div>
                        <label className="mb-2 block text-gray-300">
                            Title
                        </label>

                        <input
                            type="text"
                            placeholder="Give your story a title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                   

                    <div>
                        <label className="mb-2 block text-gray-300">
                            Your Story
                        </label>

                        <textarea
                            placeholder="Tell us the story behind this picture..."
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            rows={8}
                            className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    

                    <button
                        type="submit"
                        disabled={loading || !imageLoaded}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Creating Post..."
                            : "Create Post"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreatePost;