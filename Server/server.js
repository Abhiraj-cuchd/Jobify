import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import morgan from 'morgan';
import connectDB from './db/dbConn.js';
import router from './routes/index.js';
import errorMiddleWare from './middleware/errorMiddleWare.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

//Establish DB connection
connectDB();

// MiddleWare 
app.use(cors());
app.use(xss());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(morgan('dev'));


app.use(router);

//error middleware
app.use(errorMiddleWare)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

