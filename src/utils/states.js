const states = [
    {
        name: 'Rondônia',
        code: 11,
        acronym: 'RO'
    },
    {
        name: 'Acre',
        code: 12,
        acronym: 'AC'
    },
    {
        name: 'Amazonas',
        code: 13,
        acronym: 'AM'
    },
    {
        name: 'Roraima',
        code: 14,
        acronym: 'RR'
    },
    {
        name: 'Pará',
        code: 15,
        acronym: 'PA'
    },
    {
        name: 'Amapá',
        code: 16,
        acronym: 'AP'
    },
    {
        name: 'Tocantins',
        code: 17,
        acronym: 'TO'
    },
    {
        name: 'Maranhão',
        code: 21,
        acronym: 'MA'
    },
    {
        name: 'Piauí',
        code: 22,
        acronym: 'PI'
    },
    {
        name: 'Ceará',
        code: 23,
        acronym: 'CE'
    },
    {
        name: 'Rio Grande do Norte',
        code: 24,
        acronym: 'RN'
    },
    {
        name: 'Paraíba',
        code: 25,
        acronym: 'PB'
    },
    {
        name: 'Pernambuco',
        code: 26,
        acronym: 'PE'
    },
    {
        name: 'Alagoas',
        code: 27,
        acronym: 'AL'
    },
    {
        name: 'Sergipe',
        code: 28,
        acronym: 'SE'
    },
    {
        name: 'Bahia',
        code: 29,
        acronym: 'BA'
    },
    {
        name: 'Minas Gerais',
        code: 31,
        acronym: 'MG'
    },
    {
        name: 'Espírito Santo',
        code: 32,
        acronym: 'ES'
    },
    {
        name: 'Rio de Janeiro',
        code: 33,
        acronym: 'RJ'
    },
    {
        name: 'São Paulo',
        code: 35,
        acronym: 'SP'
    },
    {
        name: 'Paraná',
        code: 41,
        acronym: 'PR'
    },
    {
        name: 'Santa Catarina',
        code: 42,
        acronym: 'SC'
    },
    {
        name: 'Rio Grande do Sul',
        code: 43,
        acronym: 'RS'
    },
    {
        name: 'Mato Grosso do Sul',
        code: 50,
        acronym: 'MS'
    },
    {
        name: 'Mato Grosso',
        code: 51,
        acronym: 'MT'
    },
    {
        name: 'Goiás',
        code: 52,
        acronym: 'GO'
    },
    {
        name: 'Distrito Federal',
        code: 53,
        acronym: 'DF'
    },
].sort((a, b) => a.name > b.name ? 1 : -1);

export default states;
