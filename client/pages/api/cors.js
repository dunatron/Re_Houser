import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    // methods: ['GET', 'POST', 'OPTIONS'],
    methods: '*',
    credentials: true,
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

export default async function handler(req, res) {
  console.log('RUNNING CORS MIDDLEWARE ON NEXT.JS');
  // Run cors
  await cors(req, res);

  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' });
}
