import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';

// import routes
import postRoutes from './routes/posts.js';

const app = express()
const url = process.env.REACT_APP_CONNECTION_URL
const port = process.env.PORT || 3000;

// starting path for all routes
// every route in posts.js will start with /posts
// localhost:3000/posts
app.use('/posts', postRoutes)

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// use mongoose to connect to MongoDB
mongoose.connect(url, { usesNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
    .catch(e => console.log(e.message));

// mongoose.set('useFindAndModify', false)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

