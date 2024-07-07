import { getToken } from "@/lib/auth"

export default class ApiProxy {
    static async getHeaders(requiredAuth) {
        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const token = getToken();
        if (token && requiredAuth === true) {
            headers['Authorization'] = `Bearer ${token}`
        }
        return headers;
    }

    static async fetchRequest(endpoint, requestOptions) {
        let data = {};
        let status = 500;
        try {
            const response = await fetch(endpoint, requestOptions);
            data = await response.json();
            status = response.status;
        } catch (err) {
            data = {error: err};
        }
        return {data, status};
    }

    static async post(endpoint, object, requiredAuth) {
        const jsonObject = JSON.stringify(object);
        const headers = await ApiProxy.getHeaders(requiredAuth);
        const requestOptions = {
            method: 'POST',
            headers,
            body: jsonObject
        };
        return await ApiProxy.fetchRequest(endpoint, requestOptions);
    };

    static async get(endpoint, requiredAuth) {
        const headers = await ApiProxy.getHeaders(requiredAuth);
        const requestOptions = {
            method: 'GET',
            headers: headers
        }
        return await ApiProxy.fetchRequest(endpoint, requestOptions);
    }
}