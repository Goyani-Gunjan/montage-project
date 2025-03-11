import { makeAutoObservable } from "mobx";
import MontageStore from "./MontageStore";

class Manager {
    static instance: Manager;
    _montageStore = new MontageStore(this);
   
    constructor() {
        if (Manager.instance) {
            return Manager.instance;
        }
        Manager.instance = this;
        makeAutoObservable(this)
    }

    get montageStore() {
        return this._montageStore;
    }
}
export default Manager;