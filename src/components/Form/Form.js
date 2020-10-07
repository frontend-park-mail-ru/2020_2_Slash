import BaseComponent from '../BaseComponent.js';

/**
 * @class Компонента формы
 */
class Form extends BaseComponent {
    /**
     * Создает экземпляр Form
     *
     * @constructor
     * @this  {Form}
     * @param {Object} parent - Родительский элемент элемента
     * @param {Object} context - Необходимые данные для этого класса, его hbs
     */
    constructor({parent= null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Form.hbs'];
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
