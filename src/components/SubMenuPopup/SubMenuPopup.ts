import Component from '../Component';
import Context from '../../tools/Context';
import template from './SubMenuPopup.hbs';
import {Genres} from '../../consts/genres';
import {MOBILE_DEVICE_WIDTH} from '../../consts/other';

/**
 * @class
 * Компонента окошка для хэдера - войти/зарегаться // профиль/выйти
 */
class SubMenuPopup extends Component {
    private _onClick: any;

    /**
     * Создает экземпляр SubMenuPopup
     *
     * @constructor
     * @this  {SubMenuPopup}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;
        this.context = context;
        this.context.genres = Object.entries(Genres).map((elem) => elem[1]);

        this._onClick = function(event: any) {
            const {target} = event;
            if (window.innerWidth < MOBILE_DEVICE_WIDTH) {
                if (target.classList.contains('close-btn__img') || target.classList.contains('sub-menu__item')) {
                    this.remove();
                }
                return;
            }
            if (!target.classList.contains('genres') ||
                target.closest('.close-btn') ||
                !target.classList.contains('genres-btn')) {
                this.remove();
            }
        }.bind(this);

        document.querySelector('.application').addEventListener('click', this._onClick);
    }

    /**
     * Удаляет элемент в document
     */
    remove() {
        const modal = this.parent.querySelector('.genres__sub-menu');
        if (modal) {
            modal.remove();
            this.onDestroy();
        }
        document.querySelector('.application').removeEventListener('click', this._onClick);
    }

    /**
     * Коллбэк на удаление элемента SubMenuPopup со страницы
     */
    onDestroy() {
        document.querySelector('.application').removeEventListener('click', this._onClick);
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        if (window.innerWidth < MOBILE_DEVICE_WIDTH) {
            this.parent = document.querySelector('.application');
            const page = document.createElement('div');
            page.classList.add('scroll-fixed');
            page.innerHTML = this.parent.innerHTML;
            this.parent.innerHTML = '';
            this.parent.appendChild(page);
        }

        this.context.genres.forEach((genre: any) => {
            genre.contentType = this.context.contentType;
        });

        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = this.template(this.context);
        modalDiv.classList.add('genres__sub-menu');
        this.parent.appendChild(modalDiv);

        if (window.innerWidth < MOBILE_DEVICE_WIDTH) {
            document.querySelector('.blocker').classList.remove('hidden');
        }
    }
}

export default SubMenuPopup;
