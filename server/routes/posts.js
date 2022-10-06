import express from 'express'
// import controllers
import { getPosts, createPosts, updatePost, deletePost, likePost } from '../controllers/posts.js'

import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getPosts)
router.post('/', auth, createPosts)
// update existing documents with patch
// use : to make the route dynamic
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
// use patch request because updating num of likes
router.patch('/:id/likePost', auth, likePost)

export default router