
import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { PatchLazyRequestResponse } from './interfaces';
import { createPatchRequest, createPostRequest } from './utils/createRequest';

export const useAxiosPatch = (): PatchLazyRequestResponse => {
  const [error, setError] = useState<AxiosResponse | undefined | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const patchRequest = (url: string, body: Record<string, unknown>) => {
    setIsLoading(true);
    return createPatchRequest( setError, setIsLoading)(url, body);
  };

  return {
    patchRequest,
    error,
    isLoading,
  };
};
