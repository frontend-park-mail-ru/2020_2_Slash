import Controller from './Controller';
import SearchView from "../views/SearchView/SearchView";

class SearchController extends Controller {
    view: SearchView;

    constructor() {
        super(new SearchView());
    }

    switchOn() {
        const contentData = {}
        this.view.insertIntoContext(contentData);
        this.view.show();
        this.onSwitchOn();
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
