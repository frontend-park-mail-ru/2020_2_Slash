import BaseComponent from '../BaseComponent.js';
import Slider from '../Slider/Slider.js';

/**
 * @class
 * Компонента блока контента - содержит в себе ряди слайдеров с фильмами
 */
class ContentBlock extends BaseComponent {
    /**
     * Создает экземпляр ContentBlock
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {ContentBlock}
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['ContentBlock.hbs'];
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        this.context.blocks = Array.from(this.context.blocks, (block) => new Slider({context: block}).render());
        return this.template(this.context);
    }
}

export default ContentBlock;
