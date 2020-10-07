import BaseComponent from '../BaseComponent.js';

/**
 * @class Компонента футера
 */
class Footer extends BaseComponent {
    /**
     * Создает экземпляр Footer
     *
     * @constructor
     * @this  {Footer}
     * @param {Object} parent - Родительский элемент элемента
     * @param {Object} context - Необходимые данные для этого класса, его hbs
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Footer.hbs'];
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        return this.template(this.context);
    }
}

export default Footer;
