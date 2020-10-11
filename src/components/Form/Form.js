import BaseComponent from '../BaseComponent.js';
import template from './Form.hbs';

/**
 * @class
 * Компонента формы
 */
class Form extends BaseComponent {
    /**
     * Создает экземпляр Form
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {Form}
     */
    constructor({parent= null, context = {}} = {}) {
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

export default Form;
