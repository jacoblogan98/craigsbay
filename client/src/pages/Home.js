import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ListingItem from "../components/ListingItem";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";

function Home({ user, handleCardClick, isAuthenticated }) {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [currentSearch, setCurrentSearch] = useState("");
  const [alert, setAlert] = useState(false)

  const history = useHistory()

  useEffect(() => {
    fetch("/listings")
      .then((res) => res.json())
      .then((listings) => {
        setListings(listings);
        setFilteredListings(listings)
        filterCategories(listings);
      });
  }, []);

  function filterCategories(listings) {
    const catArr = listings.map((listing) => listing.category);
    const filteredCatArr = ["All", ...new Set(catArr)];

    setCategories(filteredCatArr);
  }

  const handleSortAlphabetically = () => {
    if (filtered === false) {
      const sortedListings = listings.sort(function (a, b) {
        let x = a.what_it_is.toLowerCase();
        let y = b.what_it_is.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      setFilteredListings(sortedListings);
      setFiltered(true);
    } else {
      const originalArray = listings.sort(function (a, b) {
        return a.id - b.id;
      });
      setFilteredListings(originalArray);
      setFiltered(false);
    }
  };

  function handleDelete(id) {
    const configObjDELETE = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch(`/listings/${id}`, configObjDELETE).then(() => {
      const newListings = listings.filter((listing) => listing.id !== id);

      setListings(newListings);
    });
  }

  const afterSearch = filteredListings.filter((item) => {
    if (currentSearch === "") {
      return item;
    } else if (
      item.what_it_is.toLowerCase().includes(currentSearch.toLowerCase())
    ) {
      return item;
    } else {
      return null;
    }
  });

  const filterResult = (selectedCategory) => {
    setFilteredListings(listings);

    let selection = listings.filter(
      (listing) => listing.category === selectedCategory
    );

    setFilteredListings(selection);
  };

  const renderListings = afterSearch.map((listing) => {
    if (listing.winner_id) {
      return null;
    } else {
      return (
        <ListingItem
          key={listing.id}
          listing={listing}
          user={user}
          handleCardClick={handleCardClick}
          handleDelete={handleDelete}
          isAuthenticated={isAuthenticated}
          setAlert={setAlert}
        />
      );
    }
  });

  const renderCategories = categories.map((category, index) => {
    if (category === "All") {
      return (
        <Dropdown.Item
          key={index}
          onClick={() => setFilteredListings(listings)}
        >
          {category}
        </Dropdown.Item>
      );
    } else {
      return (
        <Dropdown.Item key={index} onClick={() => filterResult(category)}>
          {category}
        </Dropdown.Item>
      );
    }
  });

  function renderAlert() {
    return (
      <Modal show={alert} onHide={() => setAlert(false)}>
        <Modal.Header className="bg-dark text-white" closeButton>
          <Modal.Title >Log In or Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You must be logged in to enter a raffle. Click one of the options below to get raffle ready. Or click away to continue browsing as a guest.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => history.push('/login')}>
            Login
          </Button>
          <Button variant="secondary" className="text-white" onClick={() => history.push('/signup')}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    )

  }

  return (
    <div>
      <Container fluid>
        <Row className="d-flex justify-content-end my-2">
          <Col className="mx-auto h-100 my-2">
            {renderAlert()}
            <InputGroup>
              <FormControl
                placeholder="Search Listings..."
                aria-label="Search"
                aria-describedby="basic-addon2"
                name="search"
                value={currentSearch}
                onChange={(e) =>
                  setCurrentSearch(e.target.value)}
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

                <Dropdown.Menu>     {renderCategories}
                </Dropdown.Menu>
              </Dropdown>
            </InputGroup>
          </Col>
        </Row>

        <Row xs={1} sm={2} md={3} lg={4}>
          {renderListings}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
