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
app.use(cors({
    origin: 'http://localhost:3000, http://192.168.0.199:3000',
    methods: 'GET,POST',
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
app.use('/api/product', productRoute);
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/seller', sellerRoute)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})