import { Html, Line } from "@react-three/drei";

const BoundingBox = ({
  boundingBox,
  isSelected,
  cornerSpheres,
  onDown,
  onMove,
  onUp,
}) => {
  if (!isSelected || !boundingBox || cornerSpheres.length !== 4) return null;

  return (
    <>
      {cornerSpheres.map((corner, i) => (
        <Html key={i} position={corner} center>
          <div
            onPointerDown={(e) => onDown(e as unknown as PointerEvent, i)}
            onPointerMove={(e) => onMove(e as unknown as PointerEvent, i)}
            onPointerUp={(e) => onUp(e as unknown as PointerEvent, i)}
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "white",
              border: "2px solid black",
              pointerEvents: "auto",
              cursor: "pointer",
            }}
          />
        </Html>
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
