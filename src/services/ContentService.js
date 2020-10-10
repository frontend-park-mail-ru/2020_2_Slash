import EventBus from './EventBus.js';
import Events from '../consts/events.js';
import InfoBlock from '../components/InfoBlock/InfoBlock.js';

/**
 * @class
 * Класс, отвечающий за создание и наполнение содержимым инфоблока о фильме/сериале
 */
class ContentService {
    /**
     * Создает экземпляр ContentService или возвращает его
     *
     * @constructor
     * @return {this}
     * @this  {ContentService}
     */
    constructor() {
        if (ContentService.__instance) {
            return ContentService.__instance;
        }

        ContentService.__instance = this;
        EventBus.on(Events.ContentInfoRequested, this.onContentInfoRequested.bind(this));
    }

    /**
     * @function
     * Колбэк на запрос инфо о фильме/сериале
     * Наполняет данными и отрисовывает инфоблок
     * @param {Object} data - Данные для этого коллбэка
     */
    onContentInfoRequested(data) {
        // const sessionData = { // запрос на валидность сессии
        //     authorized: true,
        // };

        const contentData = { // запрос за контентом по id
            poster: 'img/witcher2.jpg',
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

        const infoBlock = new InfoBlock({
            context: {
                contentId: data.id,
                contentData: contentData,
            },
        });

        infoBlock.render();
    }
}

export default new ContentService();
