export default class Popup {
    constructor(elementDom) {
        this._elementDom = elementDom;
        this._handleCloseEsc = this._handleCloseEsc.bind(this);
    }

    open() {
        document.addEventListener('keydown', this._handleCloseEsc)
        this._elementDom.classList.add('overlay_open');
    }

    close() {
        document.removeEventListener('keydown', this._handleCloseEsc);
        this._elementDom.classList.remove('overlay_open');
    }

    _handleCloseEsc(evt) {
        if (evt.key === 'Escape') {
            this._elementDom.classList.remove('overlay_open');
        }

        this._elementDom.classList.remove('overlay_open');
    }

    _handleCloseEsc() {
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                this._elementDom.classList.remove('overlay_open');
            }
        })
    }

    _overlayListeners(event) {
        if (event.target === this._elementDom) {
            this.close()
        };
    }

    setEventListeners() {
        this._handleCloseEsc();
        this._elementDom.addEventListener('click', () =>
            this._overlayListeners(event));
        this._elementDom.querySelector('.overlay__close').addEventListener('click', () =>
            this.close());
    }
}