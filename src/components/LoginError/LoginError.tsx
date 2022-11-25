import { FC } from "react"
import { LoginErrorProps } from "./interfaces"

export const LoginError: FC<LoginErrorProps> = ({error}) => {
    return (
        <p>{error?.data.message}</p>
        );
};