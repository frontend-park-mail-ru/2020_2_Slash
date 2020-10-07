import BaseComponent from '../BaseComponent.js';

/**
 * @class
 * Компонента футера
 */
class Footer extends BaseComponent {
    /**
     * Создает экземпляр Footer
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {Footer}
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
