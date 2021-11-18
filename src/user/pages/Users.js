import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const USER = [
    {
    id: 'u1',
    name: 'Hatim Khuzema',
    image: 'https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?size=626&ext=jpg',
    places: '2'
  }
]
  return <UsersList items={USER} />
}

export default Users;
