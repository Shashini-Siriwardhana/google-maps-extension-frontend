import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const httpService = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
  });

export const getData = async (url: string, params: object) => {
  try {
      const response = await httpService.get(url, { params : {...params }, withCredentials: true });
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const postData = async (url: string, data: object) => {
  try {
    const response = await httpService.post(url, data, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putData = async (url: string, data: object) => {
  try {
    const response = await httpService.put(url, data, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (url: string, params: object) => {
  try {
    const response = await httpService.delete(url, { params : {...params }});
    return response.data;
  } catch (error) {
    throw error;
  }
};