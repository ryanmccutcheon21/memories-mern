import mongoose from 'mongoose';


// create Schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

// turn Schema into model
const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage