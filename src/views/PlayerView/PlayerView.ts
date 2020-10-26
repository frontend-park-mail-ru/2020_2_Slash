import template from './PlayerView.hbs';
import Context from '../../tools/Context';
import View from '../View';
import Player from '../../components/Player/Player';

class PlayerView extends View {
    constructor(title: string = 'Flicks box', context = {}) {
        super(title, context, 'player');
        this.template = template;
    }

    show() {
        const {title} = this.context;
        const PlayerBar = new Player({title}, this);

        const data: Context = {
            PlayerBar: PlayerBar.render(),
        }

        this.context = {...this.context, data}

        this.insertIntoContext(data);
        super.show(this.template(this.context));
    }
}

export default PlayerView;
