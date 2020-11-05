import Context from '../../tools/Context';
import Item from '../Item/Item';

/**
 * @class
 * Компонента элемента слайдера - фильм/сериал миниатюра
 */
class SliderItem extends Item {
    /**
     * Создает экземпляр Item
     *
     * @constructor
     * @this  {Item}
     * @param context
     * @param parent
     */
    constructor(context: Context, parent?: any) {
        context.contentItem = 'content__slider-item';
        context.infoEvent = 'openInfoBlock';
        super(context, parent);
    }

    render(): any {
        return super.render();
    }
}

export default SliderItem;
