export default class Section {
    constructor({ renderer }, elementDom) {
        this._renderer = renderer;
        this._elementDom = elementDom;
    }

    addItem(element) {
        this._elementDom.prepend(element);
    }

    setItem(element) {
        this._elementDom.append(element);
    }

    renderItems(data) {
        data.forEach(item => {
            this._renderer(item);
        });
    }
}