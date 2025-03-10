import { BsThreeDotsVertical } from "react-icons/bs";

const Dwelling = () => {
  const images = [
    {
      src: "assets/cineapp.png",
      alt: "Design",
      heading: "Image Heading 1",
    },
    {
      src: "assets/cinoeapp.png",
      alt: "Design",
      heading: "Image Heading 2",
    },
  ];
  return (
    <div className="space-y-4 flex-1 p-2 ">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative w-full rounded flex flex-col items-start group bg-white hover:border hover:border-black hover:scale-105 transition-all duration-300e"
        >
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 rounded-full hover:bg-gray-200">
              <BsThreeDotsVertical size={20} />
            </button>
          </div>

          <div className="w-full flex flex-col gap-2 mt-2">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-70 object-cover rounded-b"
            />
            <h3 className="text-lg mb-2 ml-2 font-semibold">{image.heading}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dwelling;
