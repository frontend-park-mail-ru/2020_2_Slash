import BaseComponent from '../BaseComponent.js';
import template from './Preview.hbs';

/**
 * @class
 * Компонента фильма/сериала на главной странице
 */
class Preview extends BaseComponent {
    /**
     * Создает экземпляр Preview
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {Preview}
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = template;
    }
}

export default Preview;
