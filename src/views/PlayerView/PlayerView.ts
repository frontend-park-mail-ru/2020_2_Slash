import template from './PlayerView.hbs';
import Context from '../../tools/Context';
import View from '../View';
import Player from '../../components/Player/Player';
import {SERVER_HOST} from '../../consts/settings';

class PlayerView extends View {
    private parent: HTMLElement;

    constructor(title = 'Flicks box', context = {}) {
        super(title, context, 'player');
        this.template = template;
        this.parent = document.querySelector('.application');
    }

    show() {
        const playerBar = new Player(this.context, this.parent);

        const data: Context = {
            PlayerBar: playerBar.render(),
        };

        this.context = {...this.context, data};

        this.context.host = SERVER_HOST;

        this.insertIntoContext(data);
        super.show(this.template(this.context));
    }
}

export default PlayerView;
