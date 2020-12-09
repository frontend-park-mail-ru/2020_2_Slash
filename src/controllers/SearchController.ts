import Controller from './Controller';
import SearchView from '../views/SearchView/SearchView';
import ContentModel from '../models/ContentModel';
import {Error} from '../consts/errors';

interface ActorType {
    name: string,
    id: number,
    type: string
}

class SearchController extends Controller {
    view: SearchView;

    constructor() {
        super(new SearchView());
    }

    switchOn(data: any) {
        const query = data.query.get('query');

        ContentModel.search(query, 20).then((response) => {
            if (response.error) {
                return;
            }

            const {result} = response.body;

            const found: ActorType[] = [];
            const content: any[] = [];

            result.actors.forEach((actor: ActorType) => found.push({
                name: actor.name,
                id: actor.id,
                type: 'actor',
            }));

            result.movies.forEach((movie: any) => content.push(movie));
            result.tv_shows.forEach((tvShow: any) => content.push(tvShow));

            const items: string[] = [''];

            found.map((foundItem: ActorType) => {
                items.push(`<a href="/${foundItem.type}/${foundItem.id}" 
                            class="search-view__label">${foundItem.name}</a>`);
            });

            items.join(' ');

            const contentData = {
                content: content,
                persons: items,
            };

            this.view.insertIntoContext(contentData);
            this.view.show();
            this.onSwitchOn();
        }).catch((error: Error) => console.log(error));
    }

    onSwitchOn() {
        super.onSwitchOn();
    }

    switchOff() {
        super.switchOff();
        this.view.hide();
    }
}

export default SearchController;
