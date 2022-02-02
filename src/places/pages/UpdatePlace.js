import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceForm.css"

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Minar-e-Pakistan",
    description:
      "Minar-e-Pakistan is a national monument located in Lahore, Pakistan. The tower was built between 1960 and 1968 on the site where the All-India Muslim League passed the Lahore Resolution on 23 March 1940",
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/photo-s/19/dd/fb/84/menar-e-pakistan.jpg",
    address:
      "Minar-e-Pakistan, Circular Rd, Walled City of Lahore, Lahore, Punjab 54000, Pakistan",
    location: {
      lat: 31.5925194,
      lng: 74.3072963,
    },
    creatorId: "u1",
  },
  {
    id: "p2",
    title: "Minar-e-Pakistan",
    description:
      "Minar-e-Pakistan is a national monument located in Lahore, Pakistan. The tower was built between 1960 and 1968 on the site where the All-India Muslim League passed the Lahore Resolution on 23 March 1940",
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/photo-s/19/dd/fb/84/menar-e-pakistan.jpg",
    address:
      "Minar-e-Pakistan, Circular Rd, Walled City of Lahore, Lahore, Punjab 54000, Pakistan",
    location: {
      lat: 31.5925194,
      lng: 74.3072963,
    },
    creatorId: "u2",
  },
];

const UpdatePlaces = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  console.log(placeId)

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find any place.</h2>
      </div>
    );
  }
  return <form className="place-form">
      <Input 
        id='title' 
        element='input'
        type='text'
        label='Title'
        validators={VALIDATOR_REQUIRE()}
        errorText="Please enter a valid title."
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />

      <Input 
        id='description' 
        type='textarea'
        label='Description'
        validators={VALIDATOR_MINLENGTH(5)}
        errorText="Please enter a valid description."
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />

      <Button type="submit" disabled={true}>UPDATE</Button>
  </form>
};

export default UpdatePlaces;
