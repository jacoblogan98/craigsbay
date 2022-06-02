import React, { useEffect, useState } from "react";
import FavItem from "../components/FavItem";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col"
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/esm/Button";

function Favorites({ handleCardClick, user }) {
  const [favs, setFavs] = useState([]);
  const [allFavs, setAllFavs] = useState([])
  const [currSearch, setCurrSearch] = useState("")
  const [filtered, setFiltered] = useState(false)

  useEffect(() => {
    fetch("/favorites")
      .then((res) => res.json())
      .then((favs) => {
        setFavs(favs);
        setAllFavs(favs);
      });
  }, []);

  const handleSortAlphabetically = () => {
    if (filtered === false) {
      const sortedFavs = favs.sort(function (a, b) {
        let x = a.listing.what_it_is.toLowerCase();
        let y = b.listing.what_it_is.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      setFavs(sortedFavs);
      setFiltered(true);
    } else {
      const originalArray = favs.sort(function (a, b) {
        return a.id - b.id;
      });
      setFavs(originalArray);
      setFiltered(false);
    }
  };

  const handleRemoveFavorite = (id) => {
    const configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`/favorites/${id}`, configObj).then(
      setFavs(favs.filter((fav) => fav.id !== id))
    );
  };

  const afterSearch = favs.filter((fav) => {
    if (currSearch === "") {
      return fav;
    } else if (
      fav.listing.what_it_is.toLowerCase().includes(currSearch.toLowerCase())
    ) {
      return fav;
    } else {
      return null;
    }
  });

  const renderFavs = afterSearch.map((fav) => (
    <FavItem
      key={fav.id}
      fav={fav}
      handleRemoveFavorite={handleRemoveFavorite}
      handleCardClick={handleCardClick}
      user={user}
    />
  ));

  const categories = ["All", "Ongoing", "Won", "Lost"]

  const renderCategories = categories.map((cat, i) => {
    return (
      <Dropdown.Item key={i} onClick={() => filterResult(cat)}>
        {cat}
      </Dropdown.Item>
    );
  })

  const filterResult = (selectedCategory) => {
    const now = new Date().getTime()

    switch (selectedCategory) {
      case "Ongoing":
        let ongoing = favs.filter(
          (fav) => new Date(fav.listing.end_time).getTime() > now
        );
        setFavs(ongoing);
        break;

      case "Won":
        let won = favs.filter(
          (fav) => fav.listing.winner_id === user.id
        );
        setFavs(won);
        break;

      case "Lost":
        let lost = favs.filter(
          (fav) => fav.listing.winner_id !== user.id
        );
        setFavs(lost);
        break;

      case "All":
        setFavs(allFavs);
        break;

      default:
        return null
    }
  };

  return (
    <Container fluid>
      <Row className="text-center mt-5">
        <h1>Entered Raffles</h1>
      </Row>
      <Row className="d-flex justify-content-end my-2">
        <Col className="mx-auto h-100 my-2">
          <InputGroup>
            <FormControl
              placeholder="Search Listings..."
              aria-label="Search"
              aria-describedby="basic-addon2"
              name="search"
              value={currSearch}
              onChange={(e) =>
                setCurrSearch(e.target.value)}
            />
            <Dropdown as={ButtonGroup}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleSortAlphabetically()}
              >
                Sort A-Z
              </Button>

              <Dropdown.Toggle
                split
                variant="primary"
                id="dropdown-split-basic"
              />

              <Dropdown.Menu>                               {renderCategories}
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
        </Col>
      </Row>
      <Row xs={1} sm={2} md={3} lg={4}>
        {renderFavs}
      </Row>
    </Container>
  );
}

export default Favorites;
