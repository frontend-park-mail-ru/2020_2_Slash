import Controller from './Controller';
import MyListView from '../views/MyListView/MyListView';
import ResponseType from '../tools/ResponseType';
import ContentModel from '../models/ContentModel';

class MyListController extends Controller {
    view: MyListView;

    constructor() {
        super(new MyListView());
    }

    switchOn() {
        ContentModel.getFavourites().then((response: ResponseType) => {
            if (!response.error) {
                const contentData = {
                    content: response.body.favourites || [],
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

export default MyListController;
