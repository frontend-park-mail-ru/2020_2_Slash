import BaseComponent from '../BaseComponent.js';

/**
 * @class Компонента хэдера
 */
class Header extends BaseComponent {
    /**
     * Создает экземпляр Header или возвращает его (Header - синглтон)
     *
     * @constructor
     * @this  {Header}
     * @param {Object} parent - Родительский элемент элемента
     * @param {Object} context - Необходимые данные для этого класса, его hbs
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Header.hbs'];
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        return this.template(this.context);
    }
}

export default Header;
