import fastify from 'fastify';
import init from '../lib';
import swagger from '../lib/swagger';

const app = fastify({
    rewriteUrl: req => req.url.replace(/^\/api/, '') || '/',
    logger: true
});

swagger(app);

app.register(init);

export default async (req, res) => {
    await app.ready();

    app.swagger();

    app.server.emit('request', req, res);
};
