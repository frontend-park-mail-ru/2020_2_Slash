import EventBus from './EventBus';
import Events from '../consts/events';
import InfoBlock from '../components/InfoBlock/InfoBlock';

interface InfoBlockType {
    contentId: number,
    contentData: object,
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
        const eventBus = EventBus.getInstance();
        eventBus.on(Events.ContentInfoRequested, this.onContentInfoRequested.bind(this));
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
    onContentInfoRequested(data: {event: string, id: number}) {
        const contentData = { // запрос за контентом по id
            poster: '/static/img/witcher2.jpg',
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
        };

        const infoBlockData: InfoBlockType = {
            contentId: data.id,
            contentData: contentData,
        }

        const infoBlock = new InfoBlock(infoBlockData);

        infoBlock.render();
    }
}

export default ContentService;
