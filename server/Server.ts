import { router } from './routes';
import { enviroment } from './enviroments/enviroment';
import { getCollection } from './shared/middleware/Firestore';
import { Server } from 'socket.io';
import express from 'express';
import http from 'http';

const cors = require('cors')
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(enviroment.auth),
    storageBucket: enviroment.bucket
  });

export const bucket = admin.storage().bucket();

const server = express();

server.use(cors())

server.use(express.json());
server.use(router);

export { server };

const httpServer = new http.Server(server);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', (client: any) => {
  io.emit('Teste', {message: 'Teste'});
});

const doc = getCollection('notificacoes').doc('1YL5L3Bhmna4ybUAfFv2');

const observer = doc.onSnapshot((docSnapshot: any) => {
  console.log(`Received doc snapshot: ${docSnapshot.get('testes')}`);
  io.emit('Teste', docSnapshot);
}, (err: any) => {
  console.log(`Encountered error: ${err}`);
});
