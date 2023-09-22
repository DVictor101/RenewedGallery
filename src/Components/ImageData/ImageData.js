import React, {
 useEffect,
 useState,
} from "react";
import {
 DndProvider,
 useDrag,
 useDrop,
} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./imagedata.scss";
import ImageCard from "../ImageCard/ImageCard";
import SearchImage from "../SearchImage/SearchImage";
import { resultData } from "../../spashdata";
import { auth } from "../../Firebase";
import { TouchBackend } from "react-dnd-touch-backend";

import { isMobile } from "react-device-detect";
const selectedBackend = isMobile
 ? TouchBackend
 : HTML5Backend;

const DraggableImageCard = ({
 data,
 index,
 moveImage,
}) => {
 const [, ref] = useDrag({
  type: "IMAGE",
  item: { id: data.id, index },
 });

 const [, drop] = useDrop({
  accept: "IMAGE",
  hover: (draggedItem) => {
   if (draggedItem.index !== index) {
    moveImage(draggedItem.index, index);
    draggedItem.index = index;
   }
  },
 });

 return (
  <div
   ref={(node) => ref(drop(node))}
   className={`img-card ${
    ref.isDragging ? "isDragging" : ""
   }`}
  >
   <ImageCard data={data} tags={data.tags} />
  </div>
 );
};

const ImageData = () => {
 const [images, setImages] = useState([]);
 const [searchQuery, setSearchQuery] =
  useState("");
 const [filteredImages, setFilteredImages] =
  useState([]);
 const [isSignedIn, setIsSignedIn] =
  useState(false);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(
   (user) => {
    if (user) {
     setIsSignedIn(true);
    } else {
     setIsSignedIn(false);
    }
   }
  );

  resultData()
   .then((data) => {
    if (data && data.length > 0) {
     const dataWithTags = data.map(
      (item, index) => ({
       ...item,
       tags: [index],
      })
     );

     setImages(dataWithTags);
     setFilteredImages(dataWithTags);
     setIsLoading(false);
    } else {
     console.error(
      "No data or empty data array in the response."
     );
     setIsLoading(false);
    }
   })
   .catch((error) => {
    console.error(
     "Error fetching images:",
     error
    );
    setIsLoading(false);
   });

  return () => {
   unsubscribe();
  };
 }, []);

 useEffect(() => {
  const filtered = images.filter((data) =>
   data.user.first_name
    .toLowerCase()
    .includes(searchQuery.toLowerCase())
  );
  setFilteredImages(filtered);
 }, [searchQuery, images]);

 const moveImage = (fromIndex, toIndex) => {
  const updatedImages = [...filteredImages];
  const [movedImage] = updatedImages.splice(
   fromIndex,
   1
  );
  updatedImages.splice(toIndex, 0, movedImage);
  setFilteredImages(updatedImages);
 };

 return (
  <div className="data_cont">
   {isLoading ? (
    <div className="loading-spinner">
     <div className="spinner">
      <div className="spinner-circle"></div>
     </div>
    </div>
   ) : isSignedIn ? (
    <>
     <SearchImage
      setSearchQuery={setSearchQuery}
     />
     <DndProvider backend={selectedBackend}>
      <div className="imgdata">
       {filteredImages.map((data, index) => (
        <DraggableImageCard
         key={data.id}
         data={data}
         index={index}
         moveImage={moveImage}
        />
       ))}
      </div>
     </DndProvider>
    </>
   ) : (
    <div className="imgdata">
     {filteredImages.map((data) => (
      <div
       key={data.id}
       className="img-card img-cardtwo image-hover-effect"
       onClick={() =>
        alert(
         "Log in to enjoy more functionality."
        )
       }
      >
       <ImageCard data={data} tags={data.tags} />
      </div>
     ))}
    </div>
   )}
  </div>
 );
};

export default ImageData;
