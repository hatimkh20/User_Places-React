import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import PlaceList from "../components/PlaceList";

const UserPlaces = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedPlaces, setLoadedPlaces] = useState();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/places/user/${userId}`
        );
        console.log("response: ", response);

        if (response.status === 404) {
          console.log("Not found.");
          return;
        }

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedPlaces(responseData.place);
      } catch (err) {
        console.log("error: ", err);
      }
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) => {
      prevPlaces.filter((place) => place.id !== deletedPlaceId);
      console.log("loaded places: ", prevPlaces);
    });
  };
  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}

      {!isLoading && !loadedPlaces && (
        <div className="center">
          <Card>
            <h2>No Places Found.</h2>
          </Card>
        </div>
      )}
      <ErrorModal error={error} onClear={clearError} />
    </React.Fragment>
  );
};

export default UserPlaces;
