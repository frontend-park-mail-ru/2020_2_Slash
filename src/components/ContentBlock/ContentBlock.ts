import Component from '../Component';
import Context from '../../tools/Context';
import Slider from '../Slider/Slider';
import template from './ContentBlock.hbs';

/**
 * @class
 * Компонента блока контента - содержит в себе ряди слайдеров с фильмами
 */
class ContentBlock extends Component {
    /**
     * Создает экземпляр ContentBlock
     *
     * @constructor
     * @this  {ContentBlock}
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
        const sliders: Array<string> = [];

        this.context.blocks.forEach((block: any) => {
            sliders.push(new Slider(block).render());
        });
        this.context.blocks = sliders;
        return this.template(this.context);
    }
}

export default ContentBlock;
