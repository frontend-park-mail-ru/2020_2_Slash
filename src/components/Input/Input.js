import BaseComponent from '../BaseComponent.js';
import template from './Input.hbs';

/**
 * @class
 * Компонента инпута
 */
class Input extends BaseComponent {
    /**
     * Создает экземпляр Input
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {Input}
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

export default Input;
