import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import getConfig from 'next/config';
//import { configure } from 'axios-hooks';
//import LRU from 'lru-cache';

const { publicRuntimeConfig } = getConfig();

const { backUrl, backPort } = publicRuntimeConfig;

export const configAxios: AxiosRequestConfig = {
	baseURL: `http://${backUrl}:${backPort}`,
};

const axios = Axios.create(configAxios);

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] =
	(typeof window !== 'undefined' && localStorage.getItem('token')) || '';

//const cache = new LRU({ max: 10 });

//configure({ axios, cache });

export default axios;
