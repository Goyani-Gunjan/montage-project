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

export interface Material {
  id: number;
  name: string;
  imageURL: string;
  price: number;
}

interface SubStyle {
  id: number;
  name: string;
  materialList: Material[];
}

export interface Style {
  id: number;
  subStyleList: SubStyle[];
}

class UIStore {
  modules: Module[] = [];
  portfolios: Portfolio[] = [];
  textures: { [key: string]: THREE.Texture } = {};
  selectedModules: Module[] = [];
  selectedPortfolioId: string = "";
  styles: Style | null = null; // Add styles property
  selectedMaterials: { [key: number]: Material } = {}; // Add selectedMaterials prope
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
    // console.log(this.textures[url]);
  }

  addSelectedModule(module: Module) {
    this.selectedModules.push(module);
    // console.log(toJS(this.selectedModules));
  }

  setSelectedPortfolioId(id: string) {
    this.selectedPortfolioId = id;
  }

  // Add method to set styles
  setStyles(data: Style | null) {
    this.styles = data;
    console.log(toJS(this.styles));
  }

  // Add method to update selected materials
  setSelectedMaterial(subStyleId: number, material: Material) {
    this.selectedMaterials[subStyleId] = material;
    console.log(toJS(this.selectedMaterials));
  }

  get totalPrice() {
    const modulesPrice = this.selectedModules.reduce(
      (total, module) => total + module.pricePerSqft,
      0
    );

    const materialsPrice = Object.values(this.selectedMaterials).reduce(
      (total, material) => total + material.price,
      0
    );

    return modulesPrice + materialsPrice;
  }
}

const moduleStore = new UIStore();
export default moduleStore;
