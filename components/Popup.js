export default class Popup {
    constructor(selector) {
        this._selector = selector;
    }

    open() {
        document.addEventListener('keydown', () => this._handleEscClose(event));
        this._selector.classList.add('overlay_open');
    }

    close() {
        document.removeEventListener('keydown', () => this._handleEscClose(event));
        this._selector.classList.remove('overlay_open');
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this._selector.classList.remove('overlay_open');
        }
    }

    _overlayListeners(event) {
        if (event.target === this._selector) {
            this.close()
        };
    }

    setEventListeners() {
        this._selector.addEventListener('click', () => this._overlayListeners(event))
    }
}