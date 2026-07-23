import {protect} from "../middleware/auth.middleware.js"
import {createPost, updatePost, deletePost, getAllPost, getPostbyId} from "../controllers/post.controller.js"
import express from "express"

const router = express.Router()

router.post("/", protect, createPost);

router.get("/", getAllPost);

router.get("/:id", getPostbyId);

router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

export default router;