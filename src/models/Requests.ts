export interface SignUpRequest {
    nickname: string,
    email: string,
    password: string,
    repeated_password: string
}

export interface LoginRequest {
    email: string,
    password: string,
}

export interface UpdateProfileRequest {
    nickname: string,
    email: string,
}
