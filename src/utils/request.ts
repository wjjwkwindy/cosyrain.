import axios from 'axios';
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { message } from 'ant-design-vue'; // 使用项目中已有的 UI 库进行提示

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  // 使用 Vite 环境变量配置 Base URL，开发环境和生产环境可自动切换
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在这里可以统一添加 token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;

    // 这里可以根据后端约定的状态码进行判断
    // 假设后端约定 code === 200 为成功
    // if (res.code !== 200) {
    //   message.error(res.message || 'Error');
    //   return Promise.reject(new Error(res.message || 'Error'));
    // }

    return res;
  },
  (error) => {
    // 处理 HTTP 网络错误
    let msg = '请求失败';
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          msg = '未授权，请登录';
          break;
        case 403:
          msg = '拒绝访问';
          break;
        case 404:
          msg = '请求地址出错';
          break;
        case 500:
          msg = '服务器内部错误';
          break;
        default:
          msg = `连接错误 ${status}`;
      }
    } else if (error.message.includes('timeout')) {
      msg = '请求超时';
    }
    message.error(msg);
    return Promise.reject(error);
  }
);

export default service;
