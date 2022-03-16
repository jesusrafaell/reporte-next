import Axios, { AxiosRequestConfig } from 'axios';
import getConfig from 'next/config';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';
import { getCookie } from 'cookies-next';

const { publicRuntimeConfig } = getConfig();

const { backUrl, backPort } = publicRuntimeConfig;

const urlAxios: string = `http://${backUrl}:${backPort}`;

export const configAxios: AxiosRequestConfig = {
	baseURL: urlAxios,
	//headers: { Authorization: (typeof window !== 'undefined' && localStorage.getItem('token')) || '' },
};

const axios = Axios.create(configAxios);

axios.defaults.headers.post['Content-Type'] = 'application/json';

//For Send token
axios.interceptors.request.use(async (config: any) => {
	//console.log('interceptor', localStorage.getItem('token'));
	config.headers['Authorization'] = getCookie('token');
	return config;
});

const cache = new LRU({ max: 10 });

configure({ axios, cache });

export default axios;
