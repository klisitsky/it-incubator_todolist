import axios from "axios";

export const instanse = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  'API-KEY': 'a68c16fd-b564-46c3-b168-8a8bf32018cc',
} as any)
