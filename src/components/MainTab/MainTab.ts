import Component from '../Component';
import Context from '../../tools/Context';
import template from './MainTab.hbs';

/**
 * @class
 * Компонента страницы с кратким инфо о фильме/сериале и плеером
 */
class MainTab extends Component {
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

    addLikeIcons() {
        const likeIcon = '<img class="item-like-btn__img item__btn-img" src="/static/img/like.svg">';
        const disLikeIcon = '<img class="item-dislike-btn__img item__btn-img" src="/static/img/dislike.svg">';
        const isLikedIcon =' <img class="item-like-btn__img item__btn-img" src="/static/img/is-liked.svg">';
        const isDislikedIcon = '<img class="slider-dislike-btn__img item__btn-img" src="/static/img/is-disliked.svg">';

        if (this.context.isLike === true) {
            this.context.like = isLikedIcon;
            this.context.dislike = disLikeIcon;
        } else if (this.context.isLike === false) {
            this.context.like = likeIcon;
            this.context.dislike = isDislikedIcon;
        } else {
            this.context.like = likeIcon;
            this.context.dislike = disLikeIcon;
        }
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        this.addLikeIcons();

        this.context.slicedCast = this.context.cast.slice(0, 3);
        return this.template(this.context);
    }
}

export default MainTab;
