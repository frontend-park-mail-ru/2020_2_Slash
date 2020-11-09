export interface SignUpRequest {
    nickname: string,
    email: string,
    password: string,
    repeated_password: string //eslint-disable-line
}

export interface LoginRequest {
    email: string,
    password: string,
}

export interface UpdateProfileRequest {
    nickname: string,
    email: string,
}

export interface ContentRequest {
    content_id: number //eslint-disable-line
}
