import Component from '../Component';
import Context from '../../tools/Context';
import template from './SeasonsTab.hbs';
import {SERVER_HOST} from '../../consts/settings';
import EventBus from '../../services/EventBus';
import Events from '../../consts/events';
import Grid from '../Grid/Grid';
/**
 * @class
 * Компонента страницы с подробной информацией о фильме/сериале
 */
class SeasonsTab extends Component {
    /**
     * Создает экземпляр SeasonsTab
     *
     * @constructor
     * @this  {SeasonsTab}
     * @param context
     * @param parent
     */
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;
        this.context.host = SERVER_HOST;

        if (EventBus.getListeners().seasonChanged) {
            EventBus.getListeners().seasonChanged = [];
        }
        EventBus.on(Events.SeasonChanged, this.onSeasonChanged);
    }

    onSeasonChanged = (data: any) => {
        this.context.seasons[data.currentseason - 1].column = 5;
        this.context.seasons[data.currentseason - 1].gap = '2vw';
        this.context.seasons[data.currentseason - 1].is_free = this.context.is_free;
        this.context.Grid = new Grid(this.context.seasons[data.currentseason - 1]).render();
        const grid = document.querySelector('.seasons-wrapper__grid');
        grid.innerHTML = this.context.Grid;
    }

    render(): any {
        if (this.context.seasons.length > 0) {
            this.context.seasons[0].column = 5;
            this.context.seasons[0].gap = '2vw';
            this.context.seasons[0].is_free = this.context.is_free;
            this.context.Grid = new Grid(this.context.seasons[0]).render();
        }
        return super.render();
    }
}

export default SeasonsTab;
