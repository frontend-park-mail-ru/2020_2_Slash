import BaseComponent from '../BaseComponent.js';
import template from './Header.hbs';

/**
 * @class
 * Компонента хэдера
 */
class Header extends BaseComponent {
    /**
     * Создает экземпляр Header
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {Header}
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

export default Header;
