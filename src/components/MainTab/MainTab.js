import BaseComponent from '../BaseComponent.js';

/**
 * @class
 * Компонента страницы с кратким инфо о фильме/сериале и плеером
 */
class MainTab extends BaseComponent {
    /**
     * Создает экземпляр MainTab
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {MainTab}
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['MainTab.hbs'];
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        this.context.slicedCast = this.context.cast.slice(0, 3);
        return this.template(this.context);
    }
}

export default MainTab;
