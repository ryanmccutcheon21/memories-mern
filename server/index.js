import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'

const app = express();


app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes)


// https://www.mongodb.com/cloud/atlas
const CONNECTION_URL = 'mongodb+srv://ryanmccutcheon21:Raiden032021@cluster0.taygszv.mongodb.net/?retryWrites=true&w=majority'
// const PORT = process.env.PORT;
const PORT = 3000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch(e => console.log(e.message));

// mongoose.set('useFindAndModify', false)