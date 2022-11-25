import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { AxiosInstance } from '../axios';
import { CreateRequest } from '../interfaces';

export enum HttpMethod {
    GET= 'get',
    POST='post'
}


function createRequest(
  requestType: HttpMethod,
  onError: Dispatch<AxiosResponse | undefined | null>,
  onLoading: Dispatch<boolean>,
): CreateRequest {
  return async (url: string, body?: Record<string, unknown>) => {
    try {
        const response = await AxiosInstance[requestType](url, body)
        onError(null);
        onLoading(false);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
        onError(error.response)
        onLoading(false);
    }
    //   .then((response: AxiosResponse) => {
    //     onSuccess(response);
    //     onError(null);
    //   })
    //   .catch((response: AxiosError) => {
    //     onError(response.response);
    //     onSuccess(null);
    //   })
    //   .finally(() => onLoading(false));
  };
}
}

export function createGetRequest(
  onError: Dispatch<AxiosResponse | undefined | null>,
  onLoading: Dispatch<boolean>,
): CreateRequest {
  return createRequest(HttpMethod.GET, onError, onLoading);
}

export function createPostRequest(
  onError: Dispatch<AxiosResponse | undefined | null>,
  onLoading: Dispatch<boolean>,
): CreateRequest {
  return createRequest(HttpMethod.POST, onError, onLoading);
}
// import axios, { AxiosResponse } from 'axios';
// import { Dispatch } from 'react';
// import { AxiosInstance } from '../axios';
// import { CreateRequest } from '../interfaces';

// export enum HttpMethod {
//     GET= 'get',
//     POST='post'
// }


// function createRequest(
//   requestType: HttpMethod,
//   onSuccess: Dispatch<AxiosResponse | null>,
//   onError: Dispatch<AxiosResponse | undefined | null>,
//   onLoading: Dispatch<boolean>,
// ): CreateRequest {
//   return async (url: string, body?: Record<string, unknown>) => {
//     try {
//         const response = await AxiosInstance[requestType](url, body)
//         onSuccess(response);
//         onError(null);
//         onLoading(false);
//     } catch (error) {
//         if (axios.isAxiosError(error) && error.response) {
//         onError(error.response)
//         onSuccess(null);
//         onLoading(false);
//     }
//     //   .then((response: AxiosResponse) => {
//     //     onSuccess(response);
//     //     onError(null);
//     //   })
//     //   .catch((response: AxiosError) => {
//     //     onError(response.response);
//     //     onSuccess(null);
//     //   })
//     //   .finally(() => onLoading(false));
//   };
// }
// }

// export function createGetRequest(
//   onSuccess: Dispatch<AxiosResponse | null>,
//   onError: Dispatch<AxiosResponse | undefined | null>,
//   onLoading: Dispatch<boolean>,
// ): CreateRequest {
//   return createRequest(HttpMethod.GET, onSuccess, onError, onLoading);
// }

// export function createPostRequest(
//   onSuccess: Dispatch<AxiosResponse | null>,
//   onError: Dispatch<AxiosResponse | undefined | null>,
//   onLoading: Dispatch<boolean>,
// ): CreateRequest {
//   return createRequest(HttpMethod.POST, onSuccess, onError, onLoading);
// }