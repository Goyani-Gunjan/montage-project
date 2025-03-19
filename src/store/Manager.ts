// class StoreManager {
//   private static instance: StoreManager;
//   private stores: Map<string, unknown> = new Map();

//   private constructor() {}

//   static getInstance(): StoreManager {
//     if (!StoreManager.instance) {
//       StoreManager.instance = new StoreManager();
//     }
//     return StoreManager.instance;
//   }

//   registerStore<T>(key: string, store: T) {
//     if (!this.stores.has(key)) {
//       this.stores.set(key, store);
//     }
//   }

//   getStore<T>(key: string): T | undefined {
//     return this.stores.get(key) as T | undefined;
//   }
// }

// import UIStore from "./UIStore";
// const storeManager = StoreManager.getInstance();
// storeManager.registerStore("UIStore", UIStore);

// export default StoreManager;
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
    makeAutoObservable(this);
  }

  get montageStore() {
    return this._montageStore;
  }
}
export default Manager;
