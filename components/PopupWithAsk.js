import Popup from "./Popup.js";
import { api } from "../pages/index.js";

export default class PopupWithAsk extends Popup {
    close() {
        super.close();
        this._elementDom.querySelector('.popup').reset();
    }


    addEventListener(handler) {
        this._handler = handler;
        return this._handler;
    }

    setEventListeners() {
        this._elementDom.querySelector('.popup').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handler();
        })
        super.setEventListeners();
    }
}