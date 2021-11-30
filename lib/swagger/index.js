import fastifySwagger from 'fastify-swagger';
import fs from 'fs';
import path from 'path';
import * as $tags from './_tags';
import * as definitions from './_definitions';

/**@type {{ [K in keyof typeof $tags]: string }} */
export const tags = Object.entries($tags).reduce((tags, [key, tag]) => {
    tags[key] = tag.name;

    return tags;
}, {});

export const defs = definitions;

/**@param {import('fastify').FastifyInstance} app*/
export default function swagger(app) {
    app.register(fastifySwagger, {
        routePrefix: '/docs',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'API Mapa COVID-BR',
                version: 'v1.0',
                description: fs.readFileSync(
                    path.resolve(__dirname, 'description.md'), 'utf-8'
                ),
            },
            basePath: '/api',
            tags: Object.values($tags),
            definitions
        },
        uiConfig: {
            layout: 'BaseLayout',
        }
    });
}
