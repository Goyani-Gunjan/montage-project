import * as THREE from "three";
export interface Node {
  id: string;
  name: string;
  startPoint: THREE.Vector3;
  endPoint: THREE.Vector3;
  dominantAxis?: string;
  center: THREE.Vector3;
  originalOffset?: THREE.Vector3;
  originalCenter?: THREE.Vector3;
  originalAxis?: string;
  originalDimensions?: THREE.Vector3;
}
export interface MeshData {
  id: string;
  name: string;
  geometry: THREE.BufferGeometry;
  material: THREE.MeshStandardMaterial;
  matrix: THREE.Matrix4;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  visible: boolean;
  processed?: boolean;
}

export interface ModelData {
  id: string;
  path: string;
  position: THREE.Vector3;
  meshes: MeshData[];
  processed?: boolean;
  boundingBox?: THREE.Box3;
  rotation: [number, number, number];
  showControls?: boolean;
  nodes: Node[];
  isLocked: boolean;
  scale: [number, number, number];
}
export interface Module {
  id: number;
  name: string;
  moduleImage: string;
  pricePerSqft: number;
  noOfBedrooms: number;
  noOfBathrooms: number;
  size: number;
}

export interface Design {
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

export interface SubStyle {
  id: number;
  name: string;
  materialList: Material[];
}

export interface Style {
  id: number;
  subStyleList: SubStyle[];
}
