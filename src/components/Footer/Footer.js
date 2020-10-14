import BaseComponent from '../BaseComponent.js';
import template from './Footer.hbs';

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
        this.template = template;
    }
}

export default Footer;
