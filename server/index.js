import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';

// import routes
import postRoutes from './routes/posts.js';

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// starting path for all routes
// every route in posts.js will start with /posts
// localhost:3000/posts
app.use('/posts', postRoutes)

// const CONNECTION_URL = process.env.REACT_APP_CONNECTION_URL;
const CONNECTION_URL = 'mongodb+srv://ryanmccutcheon21:Raiden032021@memories-app.7dnxlv6.mongodb.net/?retryWrites=true&w=majority';
const PORT = 5500;

// use mongoose to connect to MongoDB
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(e => console.log(e.message));

// mongoose.set('useFindAndModify', false)

// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

// app.listen(PORT, () => {
//     console.log(`Example app listening on port ${PORT}`)
// })

