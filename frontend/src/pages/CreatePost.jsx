import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom"

function CreatePost(){
    
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async(e) => {

        e.preventDefault()

        try {
            setLoading(true);
            
            const response = await api.post("/post",{
                title,
                content,
                imageUrl,
            })

            console.log(response.data);

            navigate("/")

        } catch (error) {
            console.error(error.response?.data || error.message)
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen bg-gray-950 px-4 py-10">

            <div className="mx-auto max-w-3xl">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Create a Post
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Share a picture and tell its story.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl"
                >


                    <div className="mb-6">
                        <label className="mb-2 block text-gray-300">
                            Image URL
                        </label>

                        <input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                        />
                    </div>



                    {imageUrl && (
                        <div className="mb-6 overflow-hidden rounded-xl border border-gray-800">
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="max-h-96 w-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        </div>
                    )}



                    <div className="mb-6">
                        <label className="mb-2 block text-gray-300">
                            Title
                        </label>

                        <input
                            type="text"
                            placeholder="Give your picture a title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                        />
                    </div>



                    <div className="mb-6">
                        <label className="mb-2 block text-gray-300">
                            Story
                        </label>

                        <textarea
                            placeholder="Tell the story behind this picture..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={8}
                            className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                        />
                    </div>



                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Creating Post..." : "Create Post"}
                    </button>

                </form>

            </div>

        </div>
    )
}

export default CreatePost