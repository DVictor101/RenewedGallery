import "./searchimage.scss";

function SearchImage({ setSearchQuery }) {
 const handleInputChange = (e) => {
  setSearchQuery(e.target.value);
 };

 return (
  <div className="imgsearch">
   <input
    type="text"
    className="imginput"
    placeholder="Search Image"
    onChange={handleInputChange}
   />
  </div>
 );
}

export default SearchImage;
