import express, { Router } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js';
import sellerRoute from './routes/sellerRoute.js';
import productRoute from './routes/productRoute.js';
import cors from 'cors';
const app = express();

// const WHISLISTED_IP = process.env.ALLOWED_IP.split(',');

app.use(cors({
    // origin: WHISLISTED_IP,
    origin:"http://localhost:3000",
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
})
    .then(() => {
        console.log('Successfully connected to MongoDB.....');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });


app.use('/api', authRoute);
app.use('/api', productRoute);
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/seller', sellerRoute);

app.use('/*', (req, res) => {
    res.status(404).send({message: "Requested Resource Not found."})
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})