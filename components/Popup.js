export default class Popup {
    constructor(elementDom) {
        this._elementDom = elementDom;
        this._handleCloseEsc = this._handleCloseEsc.bind(this);
    }

    open() {
<<<<<<< HEAD
        document.addEventListener('keydown', this._handleCloseEsc)
=======
>>>>>>> d456035806381302dcd82340f5cc244c95ac870d
        this._elementDom.classList.add('overlay_open');
    }

    close() {
<<<<<<< HEAD
        document.removeEventListener('keydown', this._handleCloseEsc);
        this._elementDom.classList.remove('overlay_open');
    }

    _handleCloseEsc(evt) {
        if (evt.key === 'Escape') {
            this._elementDom.classList.remove('overlay_open');
        }
=======
        this._elementDom.classList.remove('overlay_open');
    }

    _handleCloseEsc() {
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                this._elementDom.classList.remove('overlay_open');
            }
        })

>>>>>>> d456035806381302dcd82340f5cc244c95ac870d
    }

    _overlayListeners(event) {
        if (event.target === this._elementDom) {
            this.close()
        };
    }

    setEventListeners() {
<<<<<<< HEAD
=======
        this._handleCloseEsc();
>>>>>>> d456035806381302dcd82340f5cc244c95ac870d
        this._elementDom.addEventListener('click', () =>
            this._overlayListeners(event));
        this._elementDom.querySelector('.overlay__close').addEventListener('click', () =>
            this.close());
    }
}