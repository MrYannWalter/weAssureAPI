import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import webRouter from './routes/web.js';
import cors from 'cors'; // Import the cors middleware

dotenv.config();
process.env.JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Routes
app.use('/', webRouter);

// Database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Could not connect to the database', err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
