import Component from '../Component';
import Context from '../../tools/Context';
import template from './SubMenuPopup.hbs';

/**
 * @class
 * Компонента окошка для хэдера - войти/зарегаться // профиль/выйти
 */
class SubMenuPopup extends Component {
    private _onClick: any;
    /**
     * Создает экземпляр MiniModal
     *
     * @constructor
     * @this  {MiniModal}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;
        this.context = context;

        this._onClick = function(event: any) {
            const {target} = event;
            if (target.closest('.close-btn')) {
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
    }

    /**
     * Коллбэк на удаление элемента MiniModal со страницы
     */
    onDestroy() {
        this.parent.removeEventListener('click', this._onClick);
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = this.template(this.context);
        modalDiv.classList.add('genres__sub-menu');
        this.parent.appendChild(modalDiv);
    }
}

export default SubMenuPopup;
