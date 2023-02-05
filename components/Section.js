export default class Section {
    constructor({ items, renderer }, elementDom) {
        this._items = items;
        this._renderer = renderer;
        this._elementDom = elementDom;
    }

    addItem(element) {
        this._elementDom.prepend(element);
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }
}