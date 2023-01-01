
import { AxiosResponse } from 'axios';

/** Send http request and obtain response.  */
export interface RequestResponse {
  // /** Response of server. */
  // response: AxiosResponse | null;
  /** Error of server. */
  error: AxiosResponse | undefined | null;
  /** Status response of server */
  isLoading: boolean;
}

/** Send GET request and obtain response.  */
export interface GetLazyRequestResponse extends RequestResponse {
  /** Method send GET request. */
  getRequest: (url: string, body?: Record<string, unknown>) => AxiosResponse;
}

/** Send POST request and obtain response.  */
export interface PostLazyRequestResponse extends RequestResponse {
  /** Method send POST request. */
  postRequest: (url: string, body: Record<any, unknown>) => AxiosResponse;
}

export interface PatchLazyRequestResponse extends RequestResponse {
  /** Method send POST request. */
  patchRequest: (url: string, body: Record<string, unknown>) => AxiosResponse;
}

/** Method */
export type CreateRequest = (url: string, body?: Record<string, unknown>) => any;