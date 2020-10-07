import BaseComponent from '../BaseComponent.js';
import Slider from '../Slider/Slider.js';

/**
 * @class Компонента блока контента - содержит в себе ряди слайдеров с фильмами
 */
class ContentBlock extends BaseComponent {
    /**
     * Создает экземпляр ContentBlock
     *
     * @constructor
     * @this  {ContentBlock}
     * @param {Object} parent - Родительский элемент элемента
     * @param {Object} context - Необходимые данные для этого класса, его hbs
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
