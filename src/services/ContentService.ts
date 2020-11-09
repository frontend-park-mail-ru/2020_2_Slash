import eventBus from './EventBus';
import Events from '../consts/events';
import InfoBlock from '../components/InfoBlock/InfoBlock';
import ResponseType from '../tools/ResponseType';
import ContentPopup from '../components/ContentPopup/ContentPopup';

interface InfoBlockType {
    contentId: number,
    contentData: {[key: string]: string},
}

/**
 * @class
 * Класс, отвечающий за создание и наполнение содержимым инфоблока о фильме/сериале
 */
class ContentService {
    private static instance: ContentService;

    /**
     * Создает экземпляр ContentService
     *
     * @constructor
     * @this  {ContentService}
     */
    private constructor() {
        eventBus.on(Events.OpenInfoBlock, this.onOpenInfoBlock.bind(this))
            .on(Events.ContentIsAdded, this.onContentIsAdded.bind(this))
            .on(Events.ContentIsLiked, this.onContentIsLiked.bind(this))
            .on(Events.ContentIsDisliked, this.onContentIsDisliked.bind(this))
            .on(Events.ContentInfoRequested, this.onContentInfoRequested.bind(this))
            .on(Events.ContentByExternalReference, this.onContentByExternalReference.bind(this));
    }

    /**
     * Возвращает экземпляр ContentService
     *
     * @function
     * @this  {ContentService}
     */
    public static getInstance(): ContentService {
        if (!ContentService.instance) {
            ContentService.instance = new ContentService();
        }

        return ContentService.instance;
    }

    /**
     * @function
     * Колбэк на запрос инфо о фильме/сериале
     * Наполняет данными и отрисовывает инфоблок
     * @param {Object} data - Данные для этого коллбэка
     */
    onOpenInfoBlock(data: any) {
        const contentData: ResponseType = { // запрос за контентом по id
            body: {
                poster: '/static/img/witcher2.webp',
                video: '/static/img/witcher.mp4',
                title: 'Ведьмак',
                originTitle: 'Witcher',
                rating: '100% понравилось',
                year: '2019',
                seasons: '2 сезона',
                about: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей ' +
                    'верной лошади по кличке Плотва путешествует по Континенту.',
                fullAbout: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва\n' +
                    'путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит\n' +
                    'вас от всякой настырной нечисти - хоть от чудищ болотных, оборотней и даже\n' +
                    'заколдованных принцесс. В сельской глуши местную девушку Йеннифэр, которой\n' +
                    'сильно не повезло с внешностью, зато посчастливилось иметь способности к магии,\n' +
                    'отец продаёт колдунье в ученицы. А малолетняя наследница королевства Цинтра по\n' +
                    'имени Цири вынуждена пуститься в бега, когда их страну захватывает империя\n' +
                    'Нильфгаард. Судьбы этих троих окажутся тесно связаны, но скоро сказка\n' +
                    'сказывается, да не скоро дело делается.',
                cast: ['Генри Кавилл', 'Фрейя Аллан', 'Аня Чалотра', 'Мими Дивени', 'Месия', 'Симсон',
                    'Имон Фэррен', 'МайАнна Бёринг', 'Ройс Пирресон', 'Имон Фаррен',
                    'Мими Дивени', 'Уилсон Раджу-Пухальте', 'Анна Шаффер', 'Махеш Джаду'],
                directors: ['Алик Сахаров', 'Шарлотта Брандстром', 'Алекс Гарсиа Лопес',
                    'Марк Йобст', 'Эдвард Базалгетт', 'Сара О’Горман', 'Гита Патель', 'Стивен Серджик'],
                genre: ['фэнтези', 'приключения', 'драма', 'ужасы'],
                country: 'США, Польша',
                isAdded: false,
            },
            message: '',
            error: {
                code: 1,
                user_message: '',
            },
        };

        const infoBlockData: InfoBlockType = {
            contentId: data.id,
            contentData: contentData.body,
        };

        const infoBlock = new InfoBlock(infoBlockData);

        infoBlock.render();
    }

    onContentInfoRequested(data: any) {
        const contentData: ResponseType = { // запрос за контентом по id
            body: {
                poster: '/static/img/witcher2.webp',
                video: '/static/img/witcher.mp4',
                title: 'Ведьмак',
                originTitle: 'Witcher',
                rating: '100% понравилось',
                year: '2019',
                seasons: '2 сезона',
                about: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей ' +
                    'верной лошади по кличке Плотва путешествует по Континенту.',
                fullAbout: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва\n' +
                    'путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит\n' +
                    'вас от всякой настырной нечисти - хоть от чудищ болотных, оборотней и даже\n' +
                    'заколдованных принцесс. В сельской глуши местную девушку Йеннифэр, которой\n' +
                    'сильно не повезло с внешностью, зато посчастливилось иметь способности к магии,\n' +
                    'отец продаёт колдунье в ученицы. А малолетняя наследница королевства Цинтра по\n' +
                    'имени Цири вынуждена пуститься в бега, когда их страну захватывает империя\n' +
                    'Нильфгаард. Судьбы этих троих окажутся тесно связаны, но скоро сказка\n' +
                    'сказывается, да не скоро дело делается.',
                cast: ['Генри Кавилл', 'Фрейя Аллан', 'Аня Чалотра', 'Мими Дивени', 'Месия', 'Симсон',
                    'Имон Фэррен', 'МайАнна Бёринг', 'Ройс Пирресон', 'Имон Фаррен',
                    'Мими Дивени', 'Уилсон Раджу-Пухальте', 'Анна Шаффер', 'Махеш Джаду'],
                directors: ['Алик Сахаров', 'Шарлотта Брандстром', 'Алекс Гарсиа Лопес',
                    'Марк Йобст', 'Эдвард Базалгетт', 'Сара О’Горман', 'Гита Патель', 'Стивен Серджик'],
                genre: ['фэнтези', 'приключения', 'драма', 'ужасы'],
                country: 'США, Польша',
                isAdded: false,
            },
            message: '',
            error: {
                code: 1,
                user_message: '',
            },
        };

        const content = [
            {
                id: 1,
                poster: '/static/img/witcher.webp',
            },
            {
                id: 2,
                poster: '/static/img/witcher.webp',
            },
            {
                id: 3,
                poster: '/static/img/witcher.webp',
            },
            {
                id: 58746,
                poster: '/static/img/witcher.webp',
            },
            {
                id: 4,
                poster: '/static/img/witcher.webp',
            },
            {
                id: 5,
                poster: '/static/img/witcher.webp',
            },
            {
                id: 6,
                poster: '/static/img/witcher.webp',
            },
            {
                id: 7,
                poster: '/static/img/fword.webp',
            },
        ];

        const infoBlockData = {
            contentId: data.id,
            contentData: contentData.body,
            content: content,
        };

        const path = document.location.href;
        window.history.pushState(null, null, path);
        window.history.replaceState(history.state, null, path.includes('?') ?
            path + `&cid=${data.id}` :
            path + `?cid=${data.id}`);

        const oldContentPopup = document.querySelector('.content-popup');
        if (oldContentPopup) {
            oldContentPopup.remove();
        }

        const contentPopup = new ContentPopup(infoBlockData, document.querySelector('.application'));

        contentPopup.render();
    }

    onContentByExternalReference(data: any) {
        const contentData: ResponseType = { // запрос за контентом по id
            body: {
                poster: '/static/img/witcher2.webp',
                video: '/static/img/witcher.mp4',
                title: 'Ведьмак',
                originTitle: 'Witcher',
                rating: '100% понравилось',
                year: '2019',
                seasons: '2 сезона',
                about: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей ' +
                    'верной лошади по кличке Плотва путешествует по Континенту.',
                fullAbout: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва\n' +
                    'путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит\n' +
                    'вас от всякой настырной нечисти - хоть от чудищ болотных, оборотней и даже\n' +
                    'заколдованных принцесс. В сельской глуши местную девушку Йеннифэр, которой\n' +
                    'сильно не повезло с внешностью, зато посчастливилось иметь способности к магии,\n' +
                    'отец продаёт колдунье в ученицы. А малолетняя наследница королевства Цинтра по\n' +
                    'имени Цири вынуждена пуститься в бега, когда их страну захватывает империя\n' +
                    'Нильфгаард. Судьбы этих троих окажутся тесно связаны, но скоро сказка\n' +
                    'сказывается, да не скоро дело делается.',
                cast: ['Генри Кавилл', 'Фрейя Аллан', 'Аня Чалотра', 'Мими Дивени', 'Месия', 'Симсон',
                    'Имон Фэррен', 'МайАнна Бёринг', 'Ройс Пирресон', 'Имон Фаррен',
                    'Мими Дивени', 'Уилсон Раджу-Пухальте', 'Анна Шаффер', 'Махеш Джаду'],
                directors: ['Алик Сахаров', 'Шарлотта Брандстром', 'Алекс Гарсиа Лопес',
                    'Марк Йобст', 'Эдвард Базалгетт', 'Сара О’Горман', 'Гита Патель', 'Стивен Серджик'],
                genre: ['фэнтези', 'приключения', 'драма', 'ужасы'],
                country: 'США, Польша',
                isAdded: false,
            },
            message: '',
            error: {
                code: 1,
                user_message: '',
            },
        };

        const content = [
            {
                id: 1,
                poster: '/static/img/witcher.webp',
            },
            {
                id: 2,
                poster: '/static/img/witcher.webp',
            },
            {
                id: 3,
                poster: '/static/img/witcher.webp',
            },
            {
                id: 58746,
                poster: '/static/img/witcher.webp',
            },
            {
                id: 4,
                poster: '/static/img/witcher.webp',
            },
            {
                id: 5,
                poster: '/static/img/witcher.webp',
            },
            {
                id: 6,
                poster: '/static/img/witcher.webp',
            },
            {
                id: 7,
                poster: '/static/img/fword.webp',
            },
        ];

        const infoBlockData = {
            contentId: data.id,
            contentData: contentData.body,
            content: content,
        };

        const path = document.location.href;
        window.history.pushState(null, null, path);
        window.history.replaceState(history.state, null, `/content/${data.id}`);

        const contentPopup = new ContentPopup(infoBlockData, document.querySelector('.application'));

        contentPopup.render();
    }

    changeIcon(iconOn: string, iconOff: string) {
        if (event.srcElement.parentElement.dataset.status === 'true') {
            event.srcElement.setAttribute('src', iconOff);
            event.srcElement.parentElement.dataset.status = 'false';
        } else {
            event.srcElement.setAttribute('src', iconOn);
            event.srcElement.parentElement.dataset.status = 'true';
        }
    }

    onContentIsAdded(data: {event: string, id: number, status: boolean}) {
        // TODO: Запрос на бек
        this.changeIcon('/static/img/is-added.svg', '/static/img/add.svg');
    }

    onContentIsLiked(data: {event: string, id: number, isLiked: boolean}) {
        // TODO: Запрос на бек
        this.changeIcon('/static/img/is-liked.svg', '/static/img/like.svg');

        const parent = event.srcElement.closest('.content__buttons');
        const disBtn: Element = parent.getElementsByClassName('dislike-btn')[0];
        if (event.srcElement.parentElement.dataset.status === 'true' && disBtn.attributes[3].value === 'true') {
            disBtn.attributes[3].value = 'false';
            disBtn.querySelector('.item__btn-img').setAttribute('src', '/static/img/dislike.svg');
        }
    }

    onContentIsDisliked(data: {event: string, id: number, isDisliked: boolean}) {
        // TODO: Запрос на бек
        this.changeIcon('/static/img/is-disliked.svg', '/static/img/dislike.svg');

        const parent = event.srcElement.closest('.content__buttons');
        const disBtn: Element = parent.getElementsByClassName('like-btn')[0];
        if (event.srcElement.parentElement.dataset.status === 'true' && disBtn.attributes[3].value === 'true') {
            disBtn.attributes[3].value = 'false';
            disBtn.querySelector('.item__btn-img').setAttribute('src', '/static/img/like.svg');
        }
    }
}

export default ContentService;
