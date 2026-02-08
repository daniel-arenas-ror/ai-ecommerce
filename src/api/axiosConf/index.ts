import axios from "axios";
import type {
  AxiosResponse,
  AxiosInstance, 
  AxiosRequestConfig,
  InternalAxiosRequestConfig
} from "axios";

const DEFAULT_TIMEOUT = 5000;

export class AxiosConf {
  private http: AxiosInstance;

  constructor(configuration: AxiosRequestConfig = {}) {
    this.http = axios.create(configuration);

    this.http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  public instance(): AxiosInstance {
    this.http.interceptors.response.use(
      (response: AxiosResponse) => response.data
    );

    return this.http;
  }
}

export default new AxiosConf({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
  timeout: DEFAULT_TIMEOUT,
  headers: { 
    'content-type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
    'Access-Control-Allow-Origin': '*'
  }
}).instance();
