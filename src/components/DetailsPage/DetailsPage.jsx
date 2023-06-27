import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function DetailsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const detailsReducer = useSelector((store) => store.detailsReducer);

  const handleClick = () => {
    history.push("/");
  };

  return (
    <>
      <div className="details">
        {detailsReducer.map((details) => (
          <div key={details.imdbID}>
            <h3 className="details-title">{details.Title}</h3>
            <img
              className="details-image"
              src={details.Poster}
              alt={details.Title}
            />
            <p className="details-description">
              Description: {details.Plot}
            </p>
          </div>
        ))}
        <br />
      </div>
      <button onClick={handleClick}>Back</button>
    </>
  );
}

export default DetailsPage;
