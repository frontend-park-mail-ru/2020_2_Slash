import {Error} from "../consts/errors";

interface Body {
    [key: string]: any,
}

export default interface ResponseType {
    body: Body,
    message: string,
    error: Error,
}
