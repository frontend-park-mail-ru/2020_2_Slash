class BaseController {
    constructor(view) {
        this.view = view;
    }

    switchOn(data = null) {}

    onSwitchOn() {}

    switchOff() {}

    onSwitchOff() {}
}

export default BaseController;
