import PostMessage from "../models/postMessage"

// create handlers for routes
export const getPosts = (req, res) => {
    res.send('This works!')
}

export const createPost = (req, res) => {
    res.send('Post creation')
}