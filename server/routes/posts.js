import express from 'express'
// import controllers
import { getPosts, createPosts, updatePost } from '../controllers/posts.js'

const router = express.Router()

router.get('/', getPosts)
router.post('/', createPosts)
// update existing documents with patch
// use : to make the route dynamic
router.patch('/:id', updatePost)

export default router