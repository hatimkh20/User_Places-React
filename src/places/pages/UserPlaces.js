import React from "react";
import { useParams } from "react-router"; 

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES= [
    {
        id: 'p1',
        title: 'Minar-e-Pakistan',
        description: 'Minar-e-Pakistan is a national monument located in Lahore, Pakistan. The tower was built between 1960 and 1968 on the site where the All-India Muslim League passed the Lahore Resolution on 23 March 1940',
        imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/19/dd/fb/84/menar-e-pakistan.jpg',
        address: 'Minar-e-Pakistan, Circular Rd, Walled City of Lahore, Lahore, Punjab 54000, Pakistan',
        location: {
            lat: 31.5925194,
            lng: 74.3072963
        },
        creatorId: 'u1'
    },
    {
        id: 'p2',
        title: 'Minar-e-Pakistan',
        description: 'Minar-e-Pakistan is a national monument located in Lahore, Pakistan. The tower was built between 1960 and 1968 on the site where the All-India Muslim League passed the Lahore Resolution on 23 March 1940',
        imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/19/dd/fb/84/menar-e-pakistan.jpg',
        address: 'Minar-e-Pakistan, Circular Rd, Walled City of Lahore, Lahore, Punjab 54000, Pakistan',
        location: {
            lat: 31.5925194,
            lng: 74.3072963
        },
        creatorId: 'u2'
    }

]

const UserPlaces = props => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creatorId === userId);
    return <PlaceList items={loadedPlaces} />
}

export default UserPlaces;