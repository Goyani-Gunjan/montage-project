import { makeAutoObservable } from "mobx";
import { toJS } from "mobx";

interface Module {
  id: number;
  name: string;
  moduleImage: string;
  pricePerSqft: number;
  noOfBedrooms: number;
  noOfBathrooms: number;
  size: number;
}

interface Design {
  id: string;
  name: string;
  version: string;
  designImage: string;
  monogramImage: string;
}

interface Portfolio {
  portfolioId: string;
  id: string;
  name: string;
  status: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdById: string;
  subscriptionId: string;
  designs: Design[];
}

class UIStore {
  modules: Module[] = [];
  portfolios: Portfolio[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  setModules(data: Module[]) {
    this.modules = data;
  }
  setPortfolios(data: Portfolio[]) {
    this.portfolios = data;
    console.log(toJS(this.portfolios));
  }
}

const moduleStore = new UIStore();
export default moduleStore;
