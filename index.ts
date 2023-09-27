import { server } from './server/Server';

const PORT = 3000;
const PORT_SOCKET = 3050;

server.listen(PORT, () => {
    console.log(`Run INFOSP API Server in ${PORT}`);
    console.log(`Run INFOSP WEB SOCKET Server in ${PORT_SOCKET}`);
});
  