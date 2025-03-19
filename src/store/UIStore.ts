import { makeAutoObservable } from "mobx";
import { toJS } from "mobx";
import * as THREE from "three";

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

export interface Portfolio {
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
  textures: { [key: string]: THREE.Texture } = {};
  selectedModules: Module[] = [];
  selectedPortfolioId: string = "";
  constructor() {
    makeAutoObservable(this);
  }

  setModules(data: Module[]) {
    this.modules = data;
  }
  setPortfolios(data: Portfolio[]) {
    this.portfolios = data || [];
    console.log(toJS(this.portfolios));
  }
  setTexture(url: string, texture: THREE.Texture) {
    this.textures[url] = texture;
    console.log(this.textures[url]);
  }

  addSelectedModule(module: Module) {
    this.selectedModules.push(module);
    console.log(toJS(this.selectedModules));
  }

  setSelectedPortfolioId(id: string) {
    this.selectedPortfolioId = id;
  }

  get totalPrice() {
    return this.selectedModules.reduce(
      (total, module) => total + module.pricePerSqft,
      0
    );
  }
}

const moduleStore = new UIStore();
export default moduleStore;
