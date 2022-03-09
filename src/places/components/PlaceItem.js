import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import "./PlaceItem.css";
import { AuthContext } from "../../shared/context/auth-context";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const openDeleteConfirmModalHandler = () => setShowDeleteConfirmModal(true);

  const closeDeleteConfirmModalHandler = () => setShowDeleteConfirmModal(false);

  const confirmDeleteModalHandler = () => {
    console.log("Deleting");
    setShowDeleteConfirmModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.title}
        contentClass="place-item__model-content"
        footerClass="place-item__model-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showDeleteConfirmModal}
        onCancel={closeDeleteConfirmModalHandler}
        header="Delete"
        footerClass="place-item__model-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeDeleteConfirmModalHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteModalHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>

          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>

          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              View On Map
            </Button>

            {auth.isLoggedIn && (
              <React.Fragment>
                <Button to={`/places/${props.id}`}>Edit</Button>
                <Button danger onClick={openDeleteConfirmModalHandler}>
                  Delete
                </Button>
              </React.Fragment>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
