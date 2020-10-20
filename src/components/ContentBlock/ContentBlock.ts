import TBaseComponent from '../TBaseComponent';
import Context from "../../tools/Context";
import Slider from '../Slider/Slider';
import template from './ContentBlock.hbs';

/**
 * @class
 * Компонента блока контента - содержит в себе ряди слайдеров с фильмами
 */
class ContentBlock extends TBaseComponent {
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
        let sliders: Array<string> = [];

        this.context.blocks.forEach((block: any) => {
            sliders.push(new Slider(block).render());
        });
        this.context.blocks = sliders;
        return this.template(this.context);
    }
}

export default ContentBlock;
