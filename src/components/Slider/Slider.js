import BaseComponent from '../BaseComponent.js';
import SliderItem from '../SliderItem/SliderItem.js';

/**
 * Компонента слайдера с фильмами/сериалами
 */
class Slider extends BaseComponent {
    /**
     * Создает экземпляр Slider
     *
     * @constructor
     * @this  {Slider}
     * @param {Object} parent - Родительский элемент элемента
     * @param {Object} context - Необходимые данные для этого класса, его hbs
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Slider.hbs'];
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        this.context.content = Array.from(this.context.content, (item) => new SliderItem({context: item}).render());
        return this.template(this.context);
    }
}

export default Slider;
