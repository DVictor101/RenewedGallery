import "./imagecard.scss";

const ImageCard = ({ data, tags }) => {
 // Capitalize the first letter of alt_description
 const capitalizedAltDescription =
  data.alt_description.charAt(0).toUpperCase() +
  data.alt_description.slice(1);

 return (
  <div className="imgcard">
   <div>
    <img
     className="img_ind"
     src={data.urls.regular}
     alt={capitalizedAltDescription}
    />
   </div>
   <div className="title_cont">
    <span className="img_title">{tags}</span>
   </div>
  </div>
 );
};

export default ImageCard;
