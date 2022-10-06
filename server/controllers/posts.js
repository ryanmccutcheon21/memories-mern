import express from 'express'
import mongoose from 'mongoose'
// import PostMessage
// gives us access to our model
import PostMessage from "../models/postMessage.js"

const router = express.Router()

// create all route handlers
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
}

export const createPosts = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (e) {
        res.status(409).json({ message: e.message })
    }
}

// requests made to posts/:id
export const updatePost = async (req, res) => {
    // extract id
    const { id } = req.params
    // get post from front end
    const { title, message, creator, selectedFile, tags } = req.body
    // check to see if ID is a mongoose object id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
    // if id is valid, update post
    // pass in _id, post from req.body in front end, and new: true so we can receive
    // updated version of the post
    // add await because it's an asynchronous action
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id }
    await PostMessage.findByIdAndUpdate(id, updatePost, { new: true })

    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    await PostMessage.findByIdAndRemove(id)

    res.json({ message: 'Post deleted successfully' })
}

export const likePost = async (req, res) => {
    const { id } = req.params
    // middleware logic
    if (!req.userId) return res.json({ message: 'Unauthenticated' })
    // do we have the post the user wants to like?
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
    // get the post
    const post = await PostMessage.findById(id)
    // is the user's id in the like section?
    // loop through id's in callback function so we can know who liked the post
    // if id === req.userId they already liked the post so it will be a dislike
    const index = post.likes.findIndex(id => id === String(req.userId))
    if (index === -1) {
        // like the post
        post.likes.push(req.userId)
    } else {
        // dislike the post
        post.likes = post.likes.filter(id => id !== String(req.userId))
    }
    // update the post
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

    res.json(updatedPost)
}