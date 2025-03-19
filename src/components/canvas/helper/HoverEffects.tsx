import { Line } from "@react-three/drei";
import * as THREE from "three";

const HoverEffects = ({ boundingBox, isHovered }) => {
  if (!isHovered || !boundingBox) return null;

  const hoverCorners = [
    new THREE.Vector3(boundingBox.min.x, 3.5, boundingBox.min.z),
    new THREE.Vector3(boundingBox.min.x, 3.5, boundingBox.max.z),
    new THREE.Vector3(boundingBox.max.x, 3.5, boundingBox.max.z),
    new THREE.Vector3(boundingBox.max.x, 3.5, boundingBox.min.z),
  ];

  return (
    <>
      <Line
        points={[hoverCorners[0], hoverCorners[1]]}
        color="red"
        lineWidth={2}
      />
      <Line
        points={[hoverCorners[1], hoverCorners[2]]}
        color="red"
        lineWidth={2}
      />
      <Line
        points={[hoverCorners[2], hoverCorners[3]]}
        color="red"
        lineWidth={2}
      />
      <Line
        points={[hoverCorners[3], hoverCorners[0]]}
        color="red"
        lineWidth={2}
      />
    </>
  );
};

export default HoverEffects;
