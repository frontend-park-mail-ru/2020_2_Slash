import Component from '../Component';
import Context from '../../tools/Context';
import template from './MainTab.hbs';
import {SERVER_HOST} from '../../consts/settings';

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
        const likeIcon = '<img class="info-block__like-btn__img info-block__btn-img" src="/static/img/like.svg">';
        const disLikeIcon = '<img class="info-block__dislike-btn__img info-block__btn-img" src="/static/img/dislike.svg">';
        const isLikedIcon =' <img class="info-block__like-btn__img info-block__btn-img" src="/static/img/is-liked.svg">';
        const isDislikedIcon = '<img class="info-block__dislike-btn__img info-block__btn-img" src="/static/img/is-disliked.svg">';

        if (this.context.is_liked === true) {
            this.context.like = isLikedIcon;
            this.context.dislike = disLikeIcon;
        } else if (this.context.is_liked === false) {
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
        this.context.host = SERVER_HOST;

        this.addLikeIcons();

        if (this.context.actors && this.context.actors.length > 3) {
            this.context.slicedCast = this.context.actors.slice(0, 3);
        } else {
            this.context.slicedCast = this.context.actors;
        }
        return this.template(this.context);
    }
}

export default MainTab;
