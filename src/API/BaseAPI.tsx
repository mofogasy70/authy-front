import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { VITE_URIAPI } from '../constant';

class BaseAPI {
    private headers: Headers;
    private token?: string;
    private model: string;

    constructor(model: string) {
        this.model = model;
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token');
        token && this.setToken(token);
    }
    private convertHeadersToObject(headers: Headers): Record<string, string> {
        const result: Record<string, string> = {};
        headers.forEach((value, key) => {
            result[key] = value;
        });
        return result;
    }
    public async getall(): Promise<any> {
        try {
            const config: AxiosRequestConfig = {
                headers: this.convertHeadersToObject(this.headers),
            };
            const response: AxiosResponse<any> = await axios.get(VITE_URIAPI + `/API/${this.model}/`, config);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    public async findById(_Id: string): Promise<any> {
        try {
            const config: AxiosRequestConfig = {
                headers: this.convertHeadersToObject(this.headers),
            };
            const response: AxiosResponse<any> = await axios.get(VITE_URIAPI + `/API/${this.model}/${_Id}`, config);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    public async delete(_id: string): Promise<this> {
        try {
            console.log(VITE_URIAPI + `/API/${this.model}/${_id}`);
            const config: AxiosRequestConfig = {
                headers: this.convertHeadersToObject(this.headers),
            };
            const response: AxiosResponse<any> = await axios.delete(VITE_URIAPI + `/API/${this.model}/${_id}`, config);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
        finally {
            return this;
        }
    }

    public async update(_id: string, data: any): Promise<this> {
        try {
            const config: AxiosRequestConfig = {
                headers: this.convertHeadersToObject(this.headers),
            };
            const response: AxiosResponse<any> = await axios.put(VITE_URIAPI + `/API/${this.model}/${_id}`, data, config);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
        finally {
            return this;
        }
    }

    public async create(data: any): Promise<this> {
        try {
            console.log(data);
            const config: AxiosRequestConfig = {
                headers: this.convertHeadersToObject(this.headers),
            };
            const response: AxiosResponse<any> = await axios.post(VITE_URIAPI + `/API/${this.model}/`, data, config);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
        finally {
            return this;
        }
    }

    public setToken(token: string): this {
        this.token = token;
        this.headers.set('x-auth-token', token);
        return this;
    }

    public getToken(): string | undefined {
        return this.token;
    }

    public getHeaders(): Headers {
        return this.headers;
    }

    public addHeader(key: string, value: string): this {
        this.headers.append(key, value);
        return this;
    }

    public setHeaders(headers: Headers): this {
        this.headers = headers;
        return this;
    }
}

export default BaseAPI;
