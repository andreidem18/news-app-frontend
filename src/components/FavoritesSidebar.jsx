import { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavoritesThunk,
  updateRateThunk
} from "../store/slices/favorites.slice";

const FavoritesSidebar = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(getFavoritesThunk());
  }, [ dispatch ]);

  const incrementRate = (favorite) => {
    dispatch(updateRateThunk(favorite.id, favorite.rate + 1));
  };

  const decrementRate = (favorite) => {
    dispatch(updateRateThunk(favorite.id, favorite.rate - 1));
  };

  return (
    <Offcanvas placement="end" show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul>
          {favorites?.map((favorite) => (
            <li key={favorite.id}>
              <img src={favorite.news.image} alt="" className="img-fluid" />
              {favorite.news.headline}
              <br />
              <button onClick={() => decrementRate(favorite)}>Decrement</button>
              {favorite.rate}
              <button onClick={() => incrementRate(favorite)}>Increment</button>
            </li>
          ))}
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default FavoritesSidebar;
