import Context from '../../tools/Context';
import Item from '../Item/Item';

/**
 * @class
 * Компонента элемента слайдера - фильм/сериал миниатюра
 */
class GridItem extends Item {
    /**
     * Создает экземпляр GridItem
     *
     * @constructor
     * @this  {GridItem}
     * @param context
     * @param parent
     */
    constructor(context: Context, parent?: any) {
        context.contentItem = 'content__grid-item';
        context.infoEvent = 'revealPopup';
        super(context, parent);
    }
}

export default GridItem;
