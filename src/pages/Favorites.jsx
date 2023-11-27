import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFavoriteThunk, getFavoritesThunk } from "../store/slices/favorites.slice";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoritesThunk());
  }, [ dispatch ]);

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <Link to={`/news/${favorite.news?.id}`}>
              <img src={favorite.news?.images?.[0]?.url} style={{ width: 200 }} alt="" />
              {favorite.news?.headline}
            </Link>
            <button onClick={() => dispatch(deleteFavoriteThunk(favorite.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
