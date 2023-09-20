import React, {
 useEffect,
 useState,
} from "react";
import {
 DragDropContext,
 Droppable,
 Draggable,
} from "react-beautiful-dnd";
import "./imagedata.scss";
import ImageCard from "../ImageCard/ImageCard";
import SearchImage from "../SearchImage/SearchImage";
import { resultData } from "../../spashdata";
import { auth } from "../../Firebase";

const ImageData = () => {
 const [images, setImages] = useState([]);
 const [searchQuery, setSearchQuery] =
  useState("");
 const [filteredImages, setFilteredImages] =
  useState([]);
 const [isSignedIn, setIsSignedIn] =
  useState(false);

 // Maintain an array to represent the order of images
 const [imageOrder, setImageOrder] = useState([]);

 useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(
   (user) => {
    if (user) {
     // checking if User is signed in
     setIsSignedIn(true);
    } else {
     // checking if User is signed out
     setIsSignedIn(false);
    }
   }
  );

  // Fetch images when the component mounts
  // ...

  resultData()
   .then((data) => {
    if (data && data.length > 0) {
     // Add hardcoded tags to the data
     const dataWithTags = data.map(
      (item, index) => ({
       ...item,
       tags: [
        "a woman with yellow nails",
        "a full moon",
        "a couple of shelves",
        "a large staircase",
        "a large crater",
        "a man kneeling down",
        "a wooden table",
        "a wooden door",
        "a woman in a black and white",
        "a green louis vuitton bag",
        "Two autistic friends",
        "a fire hydrant",
        "a yellow Plant close up",
        "a red truck",
        "a very tall building",
        "a person with hat",
        "a grassy hill",
        "a woman wearing a hat and glasses",
        "a snow-covered mountain",
        "a close up of a plant",
       ][index],
      })
     );

     setImages(dataWithTags);
     setFilteredImages(dataWithTags);
     // Initialize the imageOrder array
     setImageOrder(
      dataWithTags.map((item) => item.id)
     );
    } else {
     console.error(
      "No data or empty data array in the response."
     );
    }
   })
   .catch((error) => {
    console.error(
     "Error fetching images:",
     error
    );
   });

  // ...

  return () => {
   // Unsubscribe from Firebase Auth state changes when the component unmounts
   unsubscribe();
  };
 }, []);

 useEffect(() => {
  // Filter images based on the searchQuery
  const filtered = images.filter((data) =>
   data.tags
    .toLowerCase()
    .includes(searchQuery.toLowerCase())
  );
  setFilteredImages(filtered);
 }, [searchQuery, images]);

 const onDragEnd = (result) => {
  if (!result.destination) return;

  // Update the order of images in the imageOrder array
  const updatedOrder = [...imageOrder];
  updatedOrder.splice(result.source.index, 1);
  updatedOrder.splice(
   result.destination.index,
   0,
   result.draggableId
  );

  // Use the updated order to rearrange the filteredImages
  const reorderedImages = updatedOrder.map((id) =>
   images.find((image) => image.id === id)
  );

  setImageOrder(updatedOrder);
  setFilteredImages(reorderedImages);
 };

 return (
  <div className="data_cont">
   {isSignedIn ? (
    // Render drag-and-drop functionality only for signed-in users
    <>
     <SearchImage
      setSearchQuery={setSearchQuery}
     />{" "}
     {/* Render SearchImage here */}
     <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="images">
       {(provided) => (
        <div
         className="imgdata"
         {...provided.droppableProps}
         ref={provided.innerRef}
        >
         {filteredImages.map((data, index) => (
          <Draggable
           key={data.id}
           draggableId={data.id.toString()} // Convert to string
           index={index}
          >
           {(provided) => (
            <div
             ref={provided.innerRef}
             {...provided.draggableProps}
             {...provided.dragHandleProps}
            >
             <ImageCard
              data={data}
              tags={data.tags}
             />
            </div>
           )}
          </Draggable>
         ))}
         {provided.placeholder}
        </div>
       )}
      </Droppable>
     </DragDropContext>
    </>
   ) : (
    <div className="imgdata">
     {filteredImages.map((data) => (
      <ImageCard
       key={data.id}
       data={data}
       tags={data.tags}
      />
     ))}
    </div>
   )}
  </div>
 );
};

export default ImageData;
