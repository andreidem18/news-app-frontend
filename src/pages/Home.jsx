import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Row
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterNewsCategoryThunk,
  filterNewsHeadlineThunk,
  getNewsThunk
} from "../store/slices/news.slice";
import axios from '../utils/axios';

const Home = () => {
  const dispatch = useDispatch();
  const newsList = useSelector((state) => state.news);
  const [categories, setCategories] = useState([]);
  const [newsSearch, setNewsSearch] = useState("");

  useEffect(() => {
    dispatch(getNewsThunk());

    axios()
      .get("/categories/")
      .then((res) => setCategories(res.data));
  }, [dispatch]);

  console.log(categories);

  return (
    <div>
      <Row>
        {/* CATEGORIAS */}
        <Col lg={3}>
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item
                onClick={() => dispatch(filterNewsCategoryThunk(category.id))}
                style={{ cursor: "pointer" }}
                key={category.id}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* NOTICIAS */}
        <Col lg={9}>
          <h1>Componente Home</h1>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={newsSearch}
              onChange={(e) => setNewsSearch(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              onClick={() => dispatch(filterNewsHeadlineThunk(newsSearch))}
            >
              Search
            </Button>
          </InputGroup>
          <Row xs={1} md={2} lg={3} className="g-4">
            {newsList.map((newsItem) => (
              <Col key={newsItem.id}>
                <Card>
                  <Link
                    to={`/news/${newsItem.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card.Img
                      variant="top"
                      src={newsItem.images?.[0]?.url}
                      style={{ height: 200, objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{newsItem.headline}</Card.Title>
                      <Card.Text>{newsItem.lead}</Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
