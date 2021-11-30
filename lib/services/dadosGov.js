import axios from 'axios';

/**
 * @typedef {(
 * | 'ac'
 * | 'al'
 * | 'ap'
 * | 'am'
 * | 'ba'
 * | 'ce'
 * | 'df'
 * | 'es'
 * | 'go'
 * | 'ma'
 * | 'mt'
 * | 'ms'
 * | 'mg'
 * | 'pr'
 * | 'pb'
 * | 'pa'
 * | 'pe'
 * | 'pi'
 * | 'rn'
 * | 'rs'
 * | 'rj'
 * | 'ro'
 * | 'rr'
 * | 'sc'
 * | 'se'
 * | 'sp'
 * | 'to'
 * | 'all'
 * )} State
 */

/**@type {Record<State, import('axios').AxiosInstance>} */
const instances = {};

const dadosGov = new Proxy(instances, {
    get(target, state, receiver) {
        if (state in receiver) {
            return Reflect.get(target, state, receiver);
        }

        if (state === 'all') state = '*';

        return receiver[state] = axios.create({
            baseURL: `https://elasticsearch-saps.saude.gov.br/desc-notificacoes-esusve-${state}/_search`,
            method: 'post',
            auth: {
                username: 'user-public-notificacoes',
                password: 'Za4qNXdyQNSa9YaA'
            }
        });
    }
});

export default dadosGov;
