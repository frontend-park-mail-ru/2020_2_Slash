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

export interface ContRequest {
    name: string,
    // eslint-disable-next-line camelcase
    original_name: string,
    description: string,
    // eslint-disable-next-line camelcase
    short_description: string,
    year: number,
    // eslint-disable-next-line camelcase
    is_free: boolean,
    countries: number[],
    genres: number[],
    actors: number[],
    directors: number[],
}

export interface SeasonRequest {
    number: number,
    // eslint-disable-next-line camelcase
    tv_show_id: number,
}

export interface EpisodeRequest {
    name: string,
    number: number,
    description: string,
    // eslint-disable-next-line camelcase
    season_id: number,
}
