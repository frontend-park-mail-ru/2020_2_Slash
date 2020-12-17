interface TVshow {
    id: number,
    name: string,
    seasons: Season[],
}

interface Season {
    id: number,
    number: number,
    // eslint-disable-next-line camelcase
    episodes_number: number,
    // eslint-disable-next-line camelcase
    tv_show_id: number,
    episodes: Episode[],
}

interface Episode {
    id: number,
    name: string,
    number: number,
    video: string,
    description: string,
    poster: string,
    // eslint-disable-next-line camelcase
    season_id: number,
}

export {
    TVshow,
    Episode,
    Season,
};
