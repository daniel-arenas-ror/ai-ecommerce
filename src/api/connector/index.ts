import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import axiosConf from './../axiosConf';
export class Connector {
  private httpClient: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.httpClient = http;
  }

  // --- Public HTTP Methods ---

  get(url: string, config: AxiosRequestConfig = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(url, config)
        .then((response: any) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }

  post(url: string, body: any = {}, config: AxiosRequestConfig = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(url, body, config)
        .then((response: any) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }

  put(url: string, body: any, config: AxiosRequestConfig = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .put(url, body, config)
        .then((response: any) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }

  patch(url: string, body: any, config: AxiosRequestConfig = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .patch(url, body, config)
        .then((response: any) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }

  delete(url: string, config: AxiosRequestConfig = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(url, config)
        .then((response: any) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }
}

export default new Connector(axiosConf)
