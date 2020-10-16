import template from './PlayerView.hbs';
import TBaseView from '../TBaseView';
import Player from '../../components/Player/Player';

class PlayerView extends TBaseView {
    constructor(title: string = 'Flicks box', context: object = {}) {
        super(title, null, context);
        this.template = template;
    }

    show() {
        const {title} = this.context;
        const PlayerBar = new Player({
            parent: this,
            context: {title},
        });

        const data: any = {
            PlayerBar: PlayerBar.render(),
        }

        this.insertIntoContext(data)
        super.show();
    }
}

export default PlayerView;
