import {ParseUrlParam, GetGenreNameById} from './helper';

test('Pars URL params', () => {
    let urlParams;
    let result = new Map();

    urlParams = 'genre=1';
    result.set('genre', '1');
    expect(ParseUrlParam(urlParams)).toEqual(result);

    urlParams = 'season=2&episode=4';
    result = new Map();
    result.set('season', '2')
        .set('episode', '4');
    expect(ParseUrlParam(urlParams)).toEqual(result);

    urlParams = 'season=2&episode=4&other=1';
    result = new Map();
    result.set('season', '2')
        .set('episode', '4')
        .set('other', '1');
    expect(ParseUrlParam(urlParams)).toEqual(result);

    urlParams = undefined;
    result = undefined;
    expect(ParseUrlParam(urlParams)).toEqual(result);

    urlParams = '';
    result = undefined;
    expect(ParseUrlParam(urlParams)).toEqual(result);
});

test('Get genre name by ID', () => {
    let id : number;
    let result: string;

    id = 3;
    result ='Боевики';
    expect(GetGenreNameById(id)).toEqual(result);

    id = 4;
    result = 'Мелодрамы';
    expect(GetGenreNameById(id)).toEqual(result);

    id = 5;
    result = 'Триллеры';
    expect(GetGenreNameById(id)).toEqual(result);
});
