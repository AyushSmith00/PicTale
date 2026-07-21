import Post from "../models/Post.js"

export const createPost = async(req, res) => {
    try {
        const {title, content, imageUrl} = req.body;

        if(!title || !content || !imageUrl){
            return res.status(400).json({message: "All the Fields are required"})
        }

        const post = await Post.create({
            title,
            content,
            imageUrl,
            author: req.user._id,
        });

        return res.status(201).json({message: "Post Created Successfully"})

    } catch (error) {

        console.error(error)

        return res.status(500).json({message: "Server Error!! Error in creating post"})
    }
}

export const getAllPost = async(req, res) => {
    try {
        const posts = await Post.find().populate("author").sort({createdAt: -1})

        return res.status(200).json(posts)

    } catch (error) {
        console.error(error)

        return res.status(500).json({message: "Server Error !! Error in getting All the Post"})
    }
}

export const getPostbyId = async(req, res) => {
    try{
        const {id} = req.params

        const post = await Post.findById(id)

        if(!post){
            return res.status(404).json({message: "Post not Found"})
        }

        return res.status(200).json(post)

    }
    catch(error){
        console.error(error)

        return res.status(500).json({message: "Server Error!! Error in getting Single Post"})
    }
}

export const updatePost = async(req, res) => {
    try {
        
        const {id} = req.params

        const{title, content, imageUrl} = req.body

        const post = await Post.findById(id)

        if(!post){
            return res.status(404).json({message: "Post not found"})
        }

        if(post.author.toString() !== req.user._id.toString()){
            return res.status(403).json({message: "You are not allowed to update this post"})
        }

        post.title = title || post.title;
        post.content = content || post.content;
        post.imageUrl = imageUrl || post.imageUrl;

        await post.save()

        return res.status(200).json({message: "Post Updated successfully"})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Server Error!! Error in Updating Post"})
    }
}

export const deletePost = async(req, res) => {
    try {
        const {id} = req.params

        const post = await Post.findById(id)

        if(!post){
            return res.status(404).json({message: "Post not Found"})
        }

        if(post.author.toString() !== req.user._id.toString()){
            return res.status(403).json({message: "Your are not allowed to delete this post"})
        }

        await post.deleteOne();

        return res.status(200).json({message: "Post deleted Successfully"})

    } catch (error) {

        console.error(error)
        return res.status(500).json({message: "Server Error!! Error in Deleting Post"})
    }
}