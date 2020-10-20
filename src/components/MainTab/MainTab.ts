import TBaseComponent from '../TBaseComponent';
import Context from "../../tools/Context";
import template from './MainTab.hbs';

/**
 * @class
 * Компонента страницы с кратким инфо о фильме/сериале и плеером
 */
class MainTab extends TBaseComponent {
    /**
     * Создает экземпляр MainTab
     *
     * @constructor
     * @this  {MainTab}
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
        // this.context.slicedCast = this.context.cast.slice(0, 3);
        return this.template(this.context);
    }
}

export default MainTab;
