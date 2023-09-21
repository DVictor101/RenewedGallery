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
 const [isLoading, setIsLoading] = useState(true); // Add isLoading state

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
        "Antelope",
        "Sun",
        "Orange flowers",
        "Flower",
        "Woman on Flower",
        "Fish in sea",
        "Sun setting",
        "man laying",
        "mountain side",
        "Louis Vuitton",
        "Mountain walk",
        "sun rising",
        "Balloons",
        "walkway",
        "Art",
        "mountain space",
        "City View",
        "Sun setting",
        "White Car",
        "Boat Dock",
       ][index],
      })
     );

     setImages(dataWithTags);
     setFilteredImages(dataWithTags);

     // Data has loaded, set isLoading to false
     setIsLoading(false);
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

    // Data loading failed, set isLoading to false
    setIsLoading(false);
   });

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

  const sourceIndex = result.source.index;
  const destinationIndex =
   result.destination.index;

  // Create a copy of the filteredImages array
  const updatedImages = [...filteredImages];

  // Remove the dragged item from its source position
  const [draggedItem] = updatedImages.splice(
   sourceIndex,
   1
  );

  // Insert the dragged item at the destination position
  updatedImages.splice(
   destinationIndex,
   0,
   draggedItem
  );

  // Use the updated order to rearrange the filteredImages
  setFilteredImages(updatedImages);
 };

 // Define the transition duration for the animations
 const transitionDuration = "0.2s";

 // Inside your component...
 // Inside your component...
 return (
  <div className="data_cont">
   {isLoading ? (
    // Display a loading spinner while data is loading
    <div className="loading-spinner">
     <div className="spinner">
      <div className="spinner-circle"></div>
     </div>
    </div>
   ) : isSignedIn ? (
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
             style={{
              ...provided.draggableProps.style,
              transition: `transform ${transitionDuration}`,
             }}
             className="img-card" // Added a class for styling
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
     {/* Render images using the filteredImages state */}
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
