import BaseComponent from '../BaseComponent.js';
import SliderItem from '../SliderItem/SliderItem.js';

/**
 * @class
 * Компонента слайдера с фильмами/сериалами
 */
class Slider extends BaseComponent {
    /**
     * Создает экземпляр Slider
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {Slider}
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
