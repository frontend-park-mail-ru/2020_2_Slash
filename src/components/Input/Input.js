import BaseComponent from '../BaseComponent.js';

/**
 * @class Компонента инпута
 */
class Input extends BaseComponent {
    /**
     * Создает экземпляр Input
     *
     * @constructor
     * @this  {Input}
     * @param {Object} parent - Родительский элемент элемента
     * @param {Object} context - Необходимые данные для этого класса, его hbs
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Input.hbs'];
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
