import { router } from './routes';
import { enviroment } from './enviroments/enviroment';
import { startSocket } from './shared/middleware/Socket';

import express from 'express';

const cors = require('cors')
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(enviroment.auth),
  storageBucket: enviroment.bucket
});

export const bucket = admin.storage().bucket();

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);

export { server };

startSocket();
