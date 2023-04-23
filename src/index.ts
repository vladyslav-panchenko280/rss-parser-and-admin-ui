import dotenv from 'dotenv';
import express from 'express'; // Fast, unopinionated, minimalist web framework for Node.js.
import router from './services'; // Takes our Router
import bodyParser from 'body-parser'; // Node.js body parsing middleware.
import cors from 'cors';
import { connectToDatabase } from './database/connect';

dotenv.config(); // Load variables from file .env.

const app = express(); // Create an Express application.

connectToDatabase(); // Connect to MongoDB database

// Middleware
app.options('*', cors());
app.use((req: any, res: any, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
  );
  next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

router(app);

const port = process.env.PORT || 3000;

// A node http.Server is returned, with this application (which is a Function) as its callback.
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
