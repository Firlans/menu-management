import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes/route.js';
import pool from './config/database.js';

const app = express();
const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || '0.0.0.0';
const schema = process.env.APP_SCHEMA || "http";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

const startServer = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('Database connected successfully');

    app.listen(port, host, () => {
      console.log(`Server running on ${schema}://${host}:${port}`);
    });
  } catch (err) {
    console.error('Failed to connect database:', err.message);
    process.exit(1);
  }
};

startServer();

