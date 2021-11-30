import axios from 'axios';

/**
 * @typedef {(
 * | 'autosuggest'
 * | 'discover'
 * | 'geocode'
 * | 'autocomplete'
 * | 'browse'
 * | 'lookup'
 * | 'revgeocode'
 * )} ApiName
 */

/**@type {Record<ApiName, import('axios').AxiosInstance>} */
const instances = {};

const HERE = new Proxy(instances, {
    get(target, apiName, receiver) {
        if (apiName in receiver) {
            return Reflect.get(target, apiName, receiver);
        }

        return receiver[apiName] = axios.create({
            baseURL: `https://${apiName}.search.hereapi.com/v1/${apiName}`,
            method: 'get',
            params: {
                apiKey: process.env.HERE_API_KEY
            }
        });
    }
});

export default HERE;
