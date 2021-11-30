import { tags, defs } from './swagger';
import { HERE, dadosGov } from './services';

/**@type {import('fastify').FastifyPluginAsync}*/
export default async function init (app) {
    app.get('/nearby', {
        schema: {
            summary: 'Notificações de síndrome gripal por proximidade',
            description:
                'Obtém as notificações de casos de síndrome gripal com base ' +
                'na proximidade de um dado conjunto de coordenadas geográficas',
            tags: [tags.notifs],
            querystring: defs.GeoQueryRequest,
            response: {
                200: defs.GeoQueryResponse
            }
        },
        handler: async (req, res) => {
            const { lat, lng, limit } = req.query;

            const { data: { items } } = await HERE.browse({
                params: {
                    at: `${lat},${lng}`,
                    limit,
                    types: 'city',
                    in: 'countryCode:BRA'
                }
            });

            const itemsByState = items.reduce((byState, item) => {
                const state = item.address.stateCode.toLowerCase();

                if (!byState[state]) {
                    byState[state] = [];
                }

                byState[state].push(item);

                return byState;
            }, {});

            const promises = Object.entries(itemsByState)
                .map(async ([state, items]) => {
                    const aggs = items.reduce((aggs, item) => {
                        const { city } = item.address;

                        const match = { municipioNotificacao: city };

                        aggs[item.id] = {
                            filter: { match },
                            aggs: {
                                positive: {
                                    filter: {
                                        match: { resultadoTeste: 'Positivo' }
                                    }
                                },
                                negative: {
                                    filter: {
                                        match: { resultadoTeste: 'Negativo' }
                                    }
                                }
                            }
                        };

                        return aggs;
                    }, {});

                    const getData = dadosGov[state];

                    const { data: { aggregations } } = await getData({
                        data: {
                            size: 0,
                            aggs
                        }
                    });

                    for (const item of items) {
                        const notifs = aggregations[item.id];

                        if (!notifs) continue;

                        item.notifications = {
                            total: notifs.doc_count,
                            tests: {
                                negative: notifs.negative.doc_count,
                                positive: notifs.positive.doc_count
                            }
                        };
                    }
                });

            await Promise.all(promises);

            res.send({ items });
        }
    });
}
