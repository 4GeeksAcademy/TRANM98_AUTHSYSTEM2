import Card from "react-bootstrap/Card";
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

function Private() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token || store.token === "" || store.token === undefined) {
      navigate("/");
    }
  }, [store.token, history]);
  return (
    <div className="privateCard">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Welcome to your Profile</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Card Subtitle
          </Card.Subtitle>
          <Card.Text>
            You are now signed up to your profile
          </Card.Text>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Private;