export enum Errors {
    CodeBadRequest = 101,
    CodeInternalError,
    CodeUserUnauthorized,
    CodeUserDoesNotExist,
    CodeTooShortPassword,
    CodeEmailDoesNotExist,
    CodeWrongPassword,
    CodeEmailAlreadyExists,
    CodeWrongImgExtension,
    CodeSessionDoesNotExist,
}

export interface Error {
    code: number,
    user_message: string,
}
