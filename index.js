import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoute from './routes/user.js';
import projectRoute from './routes/project.js';


const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb" ,extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb" ,extended: true }));
app.use('/user', userRoute);
app.use('/projects', projectRoute);

const PORT = process.env.PORT || 5000;
app.get('/', (req,res) => {
    res.send("Hello, world!, APP is running");
})

const CONNECTION_URL = 'mongodb+srv://targaryen:codefury123@cluster0.qxsbtrb.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message) );
