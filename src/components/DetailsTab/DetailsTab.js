import BaseComponent from '../BaseComponent.js';
import template from './DetailsTab.hbs';

/**
 * @class
 * Компонента страницы с подробной информацией о фильме/сериале
 */
class DetailsTab extends BaseComponent {
    /**
     * Создает экземпляр DetailsTab
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {DetailsTab}
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = template;
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        return this.template(this.context);
    }
}

export default DetailsTab;
