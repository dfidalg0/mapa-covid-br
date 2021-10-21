import { tags, defs } from './swagger';

/**@type {import('fastify').FastifyPluginAsync}*/
export default async function init (app) {
    app.get('/hello', {
        schema: {
            summary: 'Diga oi para o mundo',
            description: 'Retorna a string "Hello, world"',
            tags: [tags.hello],
            response: {
                200: defs.Hello
            },
        },
        handler: (_, res) => res.send('"Hello, world"')
    });
}
