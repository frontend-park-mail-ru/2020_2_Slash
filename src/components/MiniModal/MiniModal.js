import BaseComponent from '../BaseComponent.js';

/**
 * @class
 * Компонента окошка для хэдера - войти/зарегаться // профиль/выйти
 */
class MiniModal extends BaseComponent {
    /**
     * Создает экземпляр MiniModal
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {MiniModal}
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['MiniModal.hbs'];

        if (MiniModal.__instance) {
            return MiniModal.__instance;
        }

        MiniModal.__instance = this;

        MiniModal.prototype._onClick = function(event) {
            const {target} = event;
            if (!target.closest('.header__user')) {
                this.remove();
                this.onDestroy();
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
        }
    }

    /**
     * Коллбэк на удаление элемента MiniModal со страницы - делает текущей инстанс синглота nullом
     */
    onDestroy() {
        this.parent.removeEventListener('click', this._onClick);
        MiniModal.__instance = null;
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
