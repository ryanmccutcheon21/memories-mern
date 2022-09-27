import mongoose from 'mongoose'
// import PostMessage
// gives us access to our model
import PostMessage from "../models/postMessage.js"

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
    const newPost = new PostMessage(post)

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
    const { id: _id } = req.params
    // get post from front end
    const post = req.body
    // check to see if ID is a mongoose object id
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
    // if id is valid, update post
    // pass in _id, post from req.body in front end, and new: true so we can receive
    // updated version of the post
    // add await because it's an asynchronous action
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    await PostMessage.findByIdAndRemove(id)

    res.json({ message: 'Post deleted successfully' })
}