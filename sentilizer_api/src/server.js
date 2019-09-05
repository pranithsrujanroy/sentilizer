import Hapi from 'hapi';
import { routes } from './routes';

const server = Hapi.server({
    host: 'localhost',
    port: 12345,
    routes: { cors: true }
});

routes.forEach((route) => {
    server.route(route);
});

async function start() {
    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
    }
    console.log('Hapi server is running');
}

start();