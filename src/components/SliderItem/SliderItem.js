import BaseComponent from '../BaseComponent.js';

/**
 * @class Компонента элемента слайдера - фильм/сериал миниатюра
 */
class SliderItem extends BaseComponent {
    /**
     * Создает экземпляр SliderItem
     *
     * @constructor
     * @this  {SliderItem}
     * @param {Object} parent - Родительский элемент элемента
     * @param {Object} context - Необходимые данные для этого класса, его hbs
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['SliderItem.hbs'];
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        return this.template(this.context);
    }
}

export default SliderItem;
