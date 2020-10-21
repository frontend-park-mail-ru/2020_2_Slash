import Component from '../Component';
import Context from '../../tools/Context';
import template from './MiniModal.hbs';

/**
 * @class
 * Компонента окошка для хэдера - войти/зарегаться // профиль/выйти
 */
class MiniModal extends Component {
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

        this._onClick = function(event: any) {
            const {target} = event;
            if (!target.closest('.header__user')) {
                this.remove();
            }
        }.bind(this);

        this.parent.addEventListener('click', this._onClick);
    }

    /**
     * Удаляет элемент в document
     */
    remove() {
        const modal = this.parent.querySelector('.mini-modal');
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
        modalDiv.classList.add('mini-modal');
        const header = this.parent.querySelector('.header');
        header.appendChild(modalDiv);
    }
}

export default MiniModal;
