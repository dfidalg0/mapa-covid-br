/**
 * @typedef {import('openapi-types').OpenAPIV2.SchemaObject} Schema
 */

/**@type {Schema} */
export const StateName = {
    type: 'string',
    example: 'São Paulo',
    enum: [
        'Acre', 'Alagoas',
        'Amapá', 'Amazonas',
        'Bahia', 'Ceará',
        'Distrito Federal', 'Espírito Santo',
        'Goiás', 'Maranhão',
        'Mato Grosso', 'Mato Grosso do Sul',
        'Minas Gerais', 'Paraná',
        'Paraíba', 'Pará',
        'Pernambuco', 'Piauí',
        'Rio Grande do Norte', 'Rio Grande do Sul',
        'Rio de Janeiro', 'Rondônia',
        'Roraima', 'Santa Catarina',
        'Sergipe', 'São Paulo',
        'Tocantins'
    ]
};

/**@type {Schema} */
export const StateCode = {
    type: 'string',
    example: 'SP',
    enum: [
        'AC', 'AL', 'AP', 'AM', 'BA',
        'CE', 'DF', 'ES', 'GO', 'MA',
        'MT', 'MS', 'MG', 'PR', 'PB',
        'PA', 'PE', 'PI', 'RN', 'RS',
        'RJ', 'RO', 'RR', 'SC', 'SE',
        'SP', 'TO'
    ]
};

/**@type {Schema} */
export const GeoQueryRequest = {
    description: 'Query geográfica para acesso à API',
    type: 'object',
    additionalProperties: false,
    required: ['lat', 'lng'],
    properties: {
        lat: {
            type: 'number',
            description: 'Latitude do ponto',
            minimum: -90,
            maximum: 90
        },
        lng: {
            type: 'number',
            description: 'Longitude do ponto',
            minimum: -180,
            maximum: 180
        },
        limit: {
            type: 'number',
            description: 'Número máximo de resultados a serem exibidos',
            minimum: 1,
            maximum: 30,
            default: 10
        }
    }
};

/**@type {Schema} */
export const Location = {
    description: 'Informações geográficas e de notificação de uma localidade',
    additionalProperties: false,
    type: 'object',
    required: [
        'id',
        'title',
        'address',
        'position',
        'distance',
        'mapView',
    ],
    properties: {
        title: {
            type: 'string',
            example: 'São Paulo, SP, Brasil'
        },
        id: {
            type: 'string',
            example: 'here:cm:namedplace:23039176'
        },
        distance: {
            type: 'number',
            example: 5744
        },
        position: {
            type: 'object',
            additionalProperties: false,
            required: ['lat', 'lng'],
            properties: {
                lat: { type: 'number', example: -23.56287 },
                lng: { type: 'number', example: -46.65468 },
            }
        },
        mapView: {
            type: 'object',
            additionalProperties: false,
            required: ['west', 'south', 'east', 'north'],
            properties: {
                west: { type: 'number', example: -46.82579 },
                south: { type: 'number', example: -24.00884 },
                east: { type: 'number', example: -46.36499 },
                north: { type: 'number', example: -23.35706 },
            },
        },
        address: {
            type: 'object',
            additionalProperties: false,
            required: [
                'label', 'countryCode', 'countryName',
                'stateCode', 'state', 'city',
            ],
            properties: {
                label: { type: 'string', example: 'São Paulo, SP, Brasil' },
                countryCode: { type: 'string', enum: ['BRA'] },
                countryName: { type: 'string', enum: ['Brasil'] },
                stateCode: StateCode,
                state: StateName,
                city: { type: 'string', example: 'São Paulo' },
            }
        },
        notifications: {
            type: 'object',
            additionalProperties: false,
            required: ['total', 'tests'],
            properties: {
                total: {
                    type: 'number',
                    example: 22412568
                },
                tests: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['positive', 'negative'],
                    properties: {
                        positive: {
                            type: 'number',
                            example: 4917574
                        },
                        negative: {
                            type: 'number',
                            example: 9515187
                        }
                    }
                }
            }
        }
    }
};

/**@type {Schema} */
export const GeoQueryResponse = {
    type: 'object',
    description:
        'Listagem de cidades próximas do ponto especificado com os respectivos ' +
        'dados de notificação de síndrome gripal',
    additionalProperties: false,
    required: ['items'],
    properties: {
        items: {
            type: 'array',
            items: Location
        }
    }
};
