import { AxiosResponse } from "axios";

export interface LoginErrorProps {
    error: AxiosResponse<any, any> | null | undefined
}