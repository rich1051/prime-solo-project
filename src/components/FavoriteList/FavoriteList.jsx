import axios from "axios";
import { useDispatch } from "react-redux";

function FavoriteList() {

    const dispatch = useDispatch();

    useEffect(() => {
      // Fetch recipes when the component mounts
      getFavorites();
    }, []);
  
    // THIS GET REQUEST IS CALLED AT THE BEGINNING TO SHOW ALL EXISTING RECIPES IN THE DB:
    const getFavorites = () => {
      axios
        .get("/api/favorites")
        .then((response) => {
          // Dispatch an action to update the state with the fetched recipes
          console.log("response is:", response);
          dispatch({
            type: "SET_FAVORITES",
            payload: response.data,
          });
          console.log("response.data is:", response.data);
        })
        .catch((error) => {
          console.log("Error fetching favorites:", error);
        });
    };

    return (
        console.log('In FavoriteList yay')
    )
};

export default FavoriteList