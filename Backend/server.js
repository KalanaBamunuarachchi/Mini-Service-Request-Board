import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: process.env.FRONT_URL, credentials: true }))
app.use(express.json());



const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server Listening on port ${PORT}`)
        });
    } catch (error){
        console.error(error);
        
    }
}

startServer();

app.get("/",(req, res) => {
    res.send("Hello From backend")
})