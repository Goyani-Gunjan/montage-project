import { makeAutoObservable } from "mobx";

interface Module {
  id: number;
  name: string;
  moduleImage: string;
  pricePerSqft: number;
  noOfBedrooms: number;
  noOfBathrooms: number;
  size: number;
}

class UIStore {
  modules: Module[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setModules(data: Module[]) {
    this.modules = data;
  }
}

const moduleStore = new UIStore();
export default moduleStore;
