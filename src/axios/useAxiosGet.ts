import { AxiosResponse } from "axios";
import { useState } from "react";
import { GetLazyRequestResponse } from "./interfaces";
import { createGetRequest } from "./utils/createRequest";

export const useAxiosGet = (): GetLazyRequestResponse => {
    const [error, setError] = useState<AxiosResponse | undefined | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const getRequest = (url: string) => {      
      setIsLoading(true);
      return createGetRequest( setError, setIsLoading)(url);
    };
  
    return {
      getRequest,
      error,
      isLoading,
    };
  };