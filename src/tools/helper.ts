import {Genres} from '../consts/genres';

export function CreateDomElement(tagName: string, attrs?: {[key:string]: string}) {
    const element = document.createElement(tagName);
    if (attrs) {
        Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    }
    return element;
}

export function ParseUrlParam(url: string) {
    const params = url.split('&');
    const paramsMap = new Map<string, string>();
    params.forEach((item) => {
        paramsMap.set(item.split('=')[0], item.split('=')[1]);
    });
    return paramsMap;
}

export function GetGenreNameById(index: number) {
    let genre: string = null;
    Object.entries(Genres).forEach((item) => {
        if (item[1].id == index) {
            genre = item[1].name;
        }
    });
    return genre;
}

export function GetNextEpisode(currentEpisode: number, currentSeason: number, queue: any) {
    return currentEpisode + 1 === queue.seasons[currentSeason].episodes_number ?
        {season: currentSeason + 1, episode: 0} : {season: currentSeason, episode: currentEpisode + 1};
}

export function GetPrevEpisode(currentEpisode: number, currentSeason: number, queue: any) {
    return currentEpisode - 1 === -1 ?
        {season: currentSeason - 1, episode: queue.seasons[currentSeason - 1].episodes_number - 1} :
        {season: currentSeason, episode: currentEpisode - 1};
}

export function isLastEpisode(currentEpisodeIndex: number, currentSeasonIndex: number, queue: any) {
    const lastSeasonsIndex = queue.seasons.length - 1;
    const lastEpisodeIndex: number = queue.seasons[lastSeasonsIndex].episodes.length - 1;
    return currentEpisodeIndex === lastEpisodeIndex && currentSeasonIndex === lastSeasonsIndex;
}

export function isFirstEpisode(currentEpisodeIndex: number, currentSeasonIndex: number) {
    return (currentEpisodeIndex === 0) && (currentSeasonIndex === 0);
}


