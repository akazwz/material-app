import {AxiosRequestConfig} from "axios";

const axios = require('axios').default;
const baseUrl = 'https://api.hellozwz.com/v1';

export async function signIn(data: any) {
    return await axios.post(baseUrl + '/token', data);
}

export interface AxiosResponse {
    data: any; // 服务端返回的数据
    status: number; // HTTP 状态码
    statusText: string; // 状态消息
    headers: any; // 响应头
    config: AxiosRequestConfig; // 请求配置对象
    request: any; // 请求的 XMLHttpRequest 对象实例
}
