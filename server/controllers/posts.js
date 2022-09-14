import PostMessage from "../models/postMessage"

// create handlers for routes
export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find()
        console.log(postMessage)

        res.status(200).json(postMessage)

    } catch (e) {
        res.status(404).json({ message: e.message })
    }
}

export const createPost = (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post)

    try {
        await newPost.save()
        res.status(201).json(newPost)
    }
    catch (e) {
        res.status(409).json({ message: e.message })
    }
}