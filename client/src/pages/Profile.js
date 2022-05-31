import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

function Profile({ user }) {
  const history = useHistory();

  const { name, age, username } = user;

  return (
    <div>
      <div>
        <h1>Account Details</h1>
        <hr></hr>
        <h2>Name: {name}</h2>
        <h3>Username: {username}</h3>
        <h6>Age: {age}</h6>
        <Button onClick={() => history.push("/ongoingraffles")}>
          Ongoing Raffles
        </Button>
        <Button onClick={() => history.push("/yourlistings")}>
          Your Listings
        </Button>
        <Button onClick={() => history.push("/postlisting")}>
          Post A Listing
        </Button>
        <Button onClick={() => history.push("/editprofile")}>
          Edit Profile
        </Button>
      </div>
    </div>
  );
}

export default Profile;
