import { useEffect, useState } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addFavoriteThunk } from "../store/slices/favorites.slice";
import { filterNewsCategoryThunk } from "../store/slices/news.slice";
import axios from '../utils/axios';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState({});

  const allNews = useSelector((state) => state.news);

  const newsFiltered = allNews.filter((news) => news.id !== Number(id));

  const dispatch = useDispatch();

  useEffect(() => {
    axios().get(`/news/${id}/`).then((res) => {
      setNews(res.data);
      dispatch(filterNewsCategoryThunk(res.data.category.id));
    });
  }, [id, dispatch]);

  const [rate, setRate] = useState("");

  const addToFavorites = () => {
    const favorite = {
      newsId: news.id,
      rate: rate
    };
    dispatch(addFavoriteThunk(favorite));
  };

  return (
    <div>
      <h1>{news.headline}</h1>
      <p>By: {news.author}</p>
      <p>{news.date}</p>
      <input
        type="text"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <Button onClick={addToFavorites}>Add to favorites</Button>
      <Row>
        {/* DESCRIPCION DE NOTICIA */}
        <Col lg={9}>
          <img src={news.images?.[0]?.url} alt="" className="img-fluid" />
          <p className="text-muted">{news.image_description}</p>
          <p>{news.body}</p>
        </Col>

        {/* NOTICIAS RELACIONADAS */}
        <Col lg={3}>
          <h3>Related News:</h3>
          <ListGroup variant="flush">
            {newsFiltered.map((newsItem) => (
              <ListGroup.Item key={newsItem.id}>
                <Link to={`/news/${newsItem.id}`}>
                  <img src={newsItem.images?.[0]?.url} alt="" className="img-fluid" />
                  {newsItem.headline}
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default NewsDetail;
