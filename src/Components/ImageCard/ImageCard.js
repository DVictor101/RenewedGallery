import "./imagecard.scss";

const ImageCard = ({ data }) => {

 return (
  <div className="imgcard">
   <div>
    <img
     className="img_ind"
     src={data.urls.regular}
     alt={`by +${data.user.first_name}`}
    />
   </div>
   <div className="title_cont">
    <span className="img_title">
     {data.user.first_name}
    </span>
   </div>
  </div>
 );
};

export default ImageCard;
