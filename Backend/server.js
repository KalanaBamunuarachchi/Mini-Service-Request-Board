import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import jobRouter from './routes/jobRoute.js';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: process.env.FRONT_URL, credentials: true }))
app.use(express.json());


//API Endpoints
app.get("/",(req, res) => {
    res.send("Hello From backend")
})

//API ENDPOINTS
app.use("/api", jobRouter)


//Error handler

app.use((req, res, next) => {
    res.status(404).json({ message: "Resource Nor Found"})

});

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});


const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server Listening on port ${PORT}`)
        });
    } catch (error){
        console.error(error);
        process.exit(1);
        
    }
}

startServer();