import {Error} from '../consts/errors'

interface Body {
    [key: string]: any;
}

export default interface ResponseType {
    headers: Headers,
    body: Body;
    message: string;
    error: Error;
} /* eslint semi: ["error", "never"]*/
