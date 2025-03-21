import { makeAutoObservable } from "mobx";
import MontageStore from "./MontageStore";
import UIStore from "./UIStore";

class Manager {
  static instance: Manager;
  _montageStore = new MontageStore(this);

  _uiStore = new UIStore(this);
  constructor() {
    if (Manager.instance) {
      return Manager.instance;
    }
    Manager.instance = this;
    makeAutoObservable(this);
  }

  get montageStore() {
    return this._montageStore;
  }

  get uiStore() {
    return this._uiStore;
  }
}
export default Manager;
