import BaseComponent from '../BaseComponent.js';
import template from './Button.hbs';

/**
 * @class
 * Компонента кнопки
 */
class Button extends BaseComponent {
    /**
     * Создает экземпляр Button
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {Button}
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = template;
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
