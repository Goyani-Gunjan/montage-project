import * as THREE from "three";
export interface Node {
  id: string;
  name: string;
  startPoint: THREE.Vector3;
  endPoint: THREE.Vector3;
  principalAxis?: string;
  center: THREE.Vector3;
}
export interface MeshData {
  id: string;
  name: string;
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
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
