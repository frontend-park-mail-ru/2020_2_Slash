import Component from '../Component';
import Context from '../../tools/Context';
import template from './Grid.hbs';
import GridItem from '../GridItem/GridItem';
import EpisodeCard from '../EpisodeCard/EpisodeCard';
import {MOBILE_DEVICE_WIDTH, TABLET_DEVICE_WIDTH} from '../../consts/other';

class Grid extends Component {
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }

    render() {
        const list: string[] = [];

        const {episodes} = this.context;
        if (this.context.episodes) {
            episodes.forEach((episode: any) => {
                list.push(new EpisodeCard(episode).render());
            });
        } else {
            const {content} = this.context;
            if (content) {
                content.forEach((item: any) => {
                    list.push(new GridItem(item).render());
                });
            }
        }

        if (!this.context.column) {
            this.context.column = 6;
        }

        if (!this.context.gap) {
            this.context.gap = '0.2vw';
        }

        if (window.innerWidth < TABLET_DEVICE_WIDTH) {
            this.context.column = 3;
        }

        if (window.innerWidth < MOBILE_DEVICE_WIDTH) {
            this.context.column = 2;
        }

        this.context.content = list;
        return list.length > 0 ? this.template(this.context) : '';
    }
}

export default Grid;
