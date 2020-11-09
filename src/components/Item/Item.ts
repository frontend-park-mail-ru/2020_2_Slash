import Component from '../Component';
import Context from '../../tools/Context';
import template from './Item.hbs';
import {SERVER_HOST} from '../../consts/settings';

/**
 * @class
 * Компонента элемента слайдера - фильм/сериал миниатюра
 */
class Item extends Component {
    /**
     * Создает экземпляр SliderItem
     *
     * @constructor
     * @this  {Item}
     * @param context
     * @param parent
     */
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }

    render(): any {
        const likeIcon = '<img class="item-like-btn__img item__btn-img" src="/static/img/like.svg">';
        const disLikeIcon = '<img class="item-dislike-btn__img item__btn-img" src="/static/img/dislike.svg">';
        const isLikedIcon =' <img class="item-like-btn__img item__btn-img" src="/static/img/is-liked.svg">';
        const isDislikedIcon = '<img class="slider-dislike-btn__img item__btn-img" src="/static/img/is-disliked.svg">';

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

        this.context.host = SERVER_HOST;
        return super.render();
    }
}

export default Item;
