const Sidebar = () => {
  const glbFiles = [
    { name: "Dwelling_tag.glb", path: "/Dwelling_tag.glb" },
    { name: "Annex_tag.glb", path: "/Annex_tag.glb" },
    { name: "Lifestyle_tag.glb", path: "/Lifestyle_tag.glb" },
  ];

  const handleDragStart = (event, file) => {
    event.dataTransfer.setData("application/json", JSON.stringify(file));
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h3>GLB Files</h3>
      {glbFiles.map((file, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, file)}
          style={{
            padding: "5px",
            margin: "5px",
            cursor: "grab",
            border: "1px solid #ccc",
            borderRadius: "3px",
            backgroundColor: "#f5f5f5",
          }}
        >
          {file.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
