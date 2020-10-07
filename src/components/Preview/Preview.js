import BaseComponent from '../BaseComponent.js';

/**
 * @class Компонента фильма/сериала на главной странице
 */
class Preview extends BaseComponent {
    /**
     * Создает экземпляр Preview
     *
     * @constructor
     * @this  {Preview}
     * @param {Object} parent - Родительский элемент элемента
     * @param {Object} context - Необходимые данные для этого класса, его hbs
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Preview.hbs'];
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        return this.template(this.context);
    }
}

export default Preview;
