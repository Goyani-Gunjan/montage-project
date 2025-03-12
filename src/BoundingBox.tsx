import { Line } from "@react-three/drei";

const BoundingBox = ({ boundingBox, isSelected, cornerSpheres }) => {
  if (!isSelected || !boundingBox || cornerSpheres.length !== 4) return null;

  return (
    <>
      {cornerSpheres.map((corner, index) => (
        <mesh key={index} position={corner}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}

      <Line
        points={[cornerSpheres[0], cornerSpheres[1]]}
        color="red"
        lineWidth={2}
      />
      <Line
        points={[cornerSpheres[1], cornerSpheres[2]]}
        color="red"
        lineWidth={2}
      />
      <Line
        points={[cornerSpheres[2], cornerSpheres[3]]}
        color="red"
        lineWidth={2}
      />
      <Line
        points={[cornerSpheres[3], cornerSpheres[0]]}
        color="red"
        lineWidth={2}
      />
    </>
  );
};

export default BoundingBox;
