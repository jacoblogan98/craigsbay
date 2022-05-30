import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import ListingDetails from "./pages/ListingDetails";
import Profile from "./pages/Profile";
import PostListingForm from "./pages/PostListingForm";
import "./index.scss";
import EditProfileForm from "./pages/EditProfileForm";
import YourListings from "./pages/YourListings";
import EditYourListingForm from "./pages/EditYourListingForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  // const [updateUserData, setUpdateUserData] = useState(false);

  const history = useHistory();

  useEffect(() => {
    fetch("/authorized_user").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
          setIsAuthenticated(true);
          setIsUserLoaded(true);
        });
      }
    });
  }, []);

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(setIsAuthenticated(false));
    history.push("/");
  };

  function handleUser(user) {
    setUser(user);
  }

  function handleAuth(value) {
    setIsAuthenticated(value);
  }

  const handleCardClick = (id, listing) => {
    history.push(`/details/${id}`, listing);
  };

  const handleEditListing = (listing) => {
    console.log(listing);
    setShowForm((showForm) => !showForm);
    // history.push("/editlisting");
    <EditYourListingForm listing={listing} />;
  };

  if (!isAuthenticated) {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <Login setUser={handleUser} setIsAuthenticated={handleAuth} />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    );
  }

  return (
    <div>
      <NavBar handleLogout={handleLogout} />
      <Switch>
        <Route exact path="/">
          <Home user={user} handleCardClick={handleCardClick} />
        </Route>
        <Route exact path="/favorites">
          <Favorites handleCardClick={handleCardClick} />
        </Route>
        <Route exact path="/details/:id">
          <ListingDetails />
        </Route>
        <Route exact path="/profile">
          <Profile user={user} isUserLoaded={isUserLoaded} />
        </Route>
        <Route exact path="/postlisting">
          <PostListingForm user={user} isUserLoaded={isUserLoaded} />
        </Route>
        <Route exact path="/editprofile">
          <EditProfileForm
            user={user}
            // updateUserData={updateUserData}
            // setUpdateUserData={setUpdateUserData}
            // handleEditProfile={handleEditProfile}
          />
        </Route>
        <Route exact path="/yourlistings">
          <YourListings
            user={user}
            showForm={showForm}
            setShowForm={setShowForm}
            handleEditListing={handleEditListing}
          />
        </Route>
        <Route exact path="/editlisting">
          <EditYourListingForm
            showForm={showForm}
            setShowForm={setShowForm}
            isUserLoaded={isUserLoaded}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
