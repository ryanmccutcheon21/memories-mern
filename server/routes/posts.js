import express from 'express'
// import controllers
import { getPosts, createPosts, updatePost, deletePost, likePost } from '../controllers/posts.js'

const router = express.Router()

router.get('/', getPosts)
router.post('/', createPosts)
// update existing documents with patch
// use : to make the route dynamic
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
// use patch request because updating num of likes
router.patch('/:id/likePost', likePost)

export default router