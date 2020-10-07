import BaseComponent from '../BaseComponent.js';

/**
 * @class Компонента страницы с подробной информацией о фильме/сериале
 */
class DetailsTab extends BaseComponent {
    /**
     * Создает экземпляр DetailsTab
     *
     * @constructor
     * @this  {DetailsTab}
     * @param {Object} parent - Родительский элемент элемента
     * @param {Object} context - Необходимые данные для этого класса, его hbs
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['DetailsTab.hbs'];
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
