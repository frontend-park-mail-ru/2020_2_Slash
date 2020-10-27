import Component from '../Component';
import Context from '../../tools/Context';
import SliderItem from '../SliderItem/SliderItem';
import template from './Slider.hbs';

/**
 * @class
 * Компонента слайдера с фильмами/сериалами
 */
class Slider extends Component {
    /**
     * Создает экземпляр Slider
     *
     * @constructor
     * @this  {Slider}
     * @param context
     * @param parent
     */
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        const items: Array<string> = [];
        this.context.content.forEach((item: any) => {
            items.push(new SliderItem(item).render());
        });
        this.context.content = items;
        return this.template(this.context);
    }
}

export default Slider;
