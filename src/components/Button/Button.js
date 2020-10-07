import BaseComponent from '../BaseComponent.js';

/**
 * @class Компонента кнопки
 */
class Button extends BaseComponent {
    /**
     * Создает экземпляр Button
     *
     * @constructor
     * @this  {Button}
     * @param {Object} parent - Родительский элемент элемента
     * @param {Object} context - Данные
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Button.hbs'];
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        return this.template(this.context);
    }
}

export default Button;
