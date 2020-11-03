import Component from '../Component';
import Context from '../../tools/Context';
import template from './GridItem.hbs';

/**
 * @class
 * Компонента элемента слайдера - фильм/сериал миниатюра
 */
class GridItem extends Component {
    /**
     * Создает экземпляр SliderItem
     *
     * @constructor
     * @this  {SliderItem}
     * @param context
     * @param parent
     */
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }
}

export default GridItem;
