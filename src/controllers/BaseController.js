class BaseController {
    constructor(view) {
        this.view = view;
    }

    switchOn(data = {}) {}

    switchOff() {}
}

export default BaseController;
