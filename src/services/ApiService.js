import request from '@/plugins/axios'

export default class ApiService {
    static get(url, config) {
        return request
            .get(url, config)
            .then((response) => response.data)
            .catch((error) => {
                throw new Error(`Error get data to ${url}: ${error.message}`)
            })
    }

    static post(url, data, config) {
        return request
            .post(url, data, config)
            .then((response) => response.data)
            .catch((error) => {
                throw new Error(`Error post data to ${url}: ${error.message}`)
            })
    }

    static put(url, data) {
        return request
            .put(url, data)
            .then((response) => response.data)
            .catch((error) => {
                throw new Error(`Error put data to ${url}: ${error.message}`)
            })
    }

    static delete(url, data) {
        return request
            .delete(url, { data })
            .then((response) => response.data)
            .catch((error) => {
                throw new Error(`Error delete data to ${url}: ${error.message}`)
            })
    }
}
