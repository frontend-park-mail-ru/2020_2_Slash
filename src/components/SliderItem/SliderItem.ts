import Component from '../Component';
import Context from '../../tools/Context';
import template from './SliderItem.hbs';

/**
 * @class
 * Компонента элемента слайдера - фильм/сериал миниатюра
 */
class SliderItem extends Component {
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

export default SliderItem;
