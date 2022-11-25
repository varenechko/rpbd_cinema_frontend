import axios from "axios";
import { AxiosInstance } from "./axios";

export const sendGetRequest = async (url: string) => {
  try {
    const response = await AxiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error();
  }
};

export const sendPostRequest = async (url: string, body: object) => {
  try {
    const response = await AxiosInstance.post(url, body);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) 
      return error.response;
    console.error();
    // if (error.status=== '420')
    // return error
    // return new Error(error);
  }
};

export const sendEditRequest = async (url: string, body: object) => {
  try {
    await AxiosInstance.put(url, body);
  } catch (error) {
    console.error();
  }
};

export const sendDeleteRequest = async (id: number) => {
  try {
    await AxiosInstance.delete(`publications/${id}`);
  } catch (error) {
    console.error();
  }
};