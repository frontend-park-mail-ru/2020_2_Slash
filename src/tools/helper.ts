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


