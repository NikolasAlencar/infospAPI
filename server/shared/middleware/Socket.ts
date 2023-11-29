import { getCollection } from './Firestore';
import { Server } from 'socket.io';

export const startSocket = async () => {
    const io = new Server(443, { cors: { origin: '*' } });

    io.on('connection', (socket) => console.log('Socket ativo'));

    const doc = await getCollection('notificacoes')
                .orderBy("timestamp", "desc")
                .limit(1)
                .onSnapshot((result: any) => result.forEach((document: any) => {
                    io.emit('getNotificacoes', document.data())
                }, (error: any) => {
                    console.log(error)
                }))
}