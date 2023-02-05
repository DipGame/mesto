export default class Popup {
    constructor(elementDom) {
        this._elementDom = elementDom;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        document.addEventListener('keydown', () => this._handleEscClose(event));
        this._elementDom.classList.add('overlay_open');
    }

    close() {
        document.addEventListener('keydown', () => this._handleEscClose(event));
        this._elementDom.classList.remove('overlay_open');
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this._elementDom.classList.remove('overlay_open');
        }
    }


    _overlayListeners(event) {
        if (event.target === this._elementDom) {
            this.close()
        };
    }

    setEventListeners() {
        this._elementDom.addEventListener('click', () =>
            this._overlayListeners(event));
        this._elementDom.querySelector('.overlay__close').addEventListener('click', () =>
            this.close());
    }
}