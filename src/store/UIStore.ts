import { makeAutoObservable } from "mobx";
import { toJS } from "mobx";
import * as THREE from "three";
import Manager from "./Manager";

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
  styles: Style | null = null;
  selectedMaterials: { [key: number]: Material } = {};
  currentDesignName: string = "Untitled-1";
  manager: Manager | null = null;
  constructor(libState: Manager) {
    this.manager = libState;
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
  }

  addSelectedModule(module: Module) {
    this.selectedModules.push(module);
    console.log(toJS(this.selectedModules));
  }

  setSelectedPortfolioId(id: string) {
    this.selectedPortfolioId = id;
  }

  setStyles(data: Style | null) {
    this.styles = data;
    // console.log(toJS(this.styles));
  }

  setSelectedMaterial(subStyleId: number, material: Material) {
    this.selectedMaterials[subStyleId] = material;
    if (subStyleId == 1) {
      this.manager?.montageStore.updateTextureForModel(material.imageURL);
    }
    if (subStyleId == 2) {
      this.manager?.montageStore.updateTextureForModel(material.imageURL);
    }
  }

  setCurrentDesignName(name: string) {
    this.currentDesignName = name;
  }

  get configuredStyle() {
    return Object.entries(this.selectedMaterials).map(
      ([subStyleId, material]) => ({
        subStyleId: parseInt(subStyleId, 10),
        selectedMaterialId: material.id,
      })
    );
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

export default UIStore;
