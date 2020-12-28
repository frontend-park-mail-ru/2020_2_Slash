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

export interface UpdateSecurityProfileRequest {
    // eslint-disable-next-line camelcase
    old_password: string,
    // eslint-disable-next-line camelcase
    new_password: string,
    // eslint-disable-next-line camelcase
    repeated_new_password: string,
}

export interface ContentRequest {
    content_id: number //eslint-disable-line
}
