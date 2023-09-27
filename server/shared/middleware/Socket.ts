import { getCollection } from './Firestore';
import { Server } from 'socket.io';

export const startSocket = () => {
    const io = new Server(3050, { cors: { origin: '*' } });

    io.on('connection', (socket) => console.log('Socket ativo'));

    const doc = getCollection('notificacoes').doc('1YL5L3Bhmna4ybUAfFv2');
    
    const observer = doc.onSnapshot((docSnapshot: any) => {
        io.emit('getNotificacoes', docSnapshot.data())
    }, (err: any) => {
        console.log(`Encountered error: ${err}`);
    });
}