import Controller from './Controller';
import SearchView from '../views/SearchView/SearchView';
import ContentModel from '../models/ContentModel';
import {Error} from '../consts/errors';

class SearchController extends Controller {
    view: SearchView;

    constructor() {
        super(new SearchView());
    }

    switchOn(data: any) {
        let query;
        data.query.forEach((item: any) => {
            query = item;
        });

        ContentModel.search(query, 5).then((response) => {
            if (!response.error) {
                const {result} = response.body;

                const found: any[] = [];
                const content: any[] = [];
                result.actors.forEach((actor: any) => found.push({
                    name: actor.name,
                    id: actor.id,
                    type: 'actor',
                }));
                result.movies.forEach((movie: any) => content.push(movie));
                result.tv_shows.forEach((tvShow: any) => content.push(tvShow));

                let items = '';

                found.forEach((foundItem) => {
                    items = items + `<a href="/${foundItem.type}/${foundItem.id}" 
                            class="search-view__label">${foundItem.name}</a>`;
                });

                const contentData = {
                    content: content,
                    persons: items,
                };
                this.view.insertIntoContext(contentData);
                this.view.show();
                this.onSwitchOn();
            }
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
