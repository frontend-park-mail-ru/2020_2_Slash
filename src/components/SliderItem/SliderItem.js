import BaseComponent from '../BaseComponent.js';
import template from './SliderItem.hbs';

/**
 * @class
 * Компонента элемента слайдера - фильм/сериал миниатюра
 */
class SliderItem extends BaseComponent {
    /**
     * Создает экземпляр SliderItem
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {SliderItem}
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = template;
    }
}

export default SliderItem;
