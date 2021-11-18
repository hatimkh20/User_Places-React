import React from "react";
import UserItem from "./UserItem";

import './UsersList.css';

const UsersList = props => {
    if (props.items.length === 0) {
        return <div className='center'>No Users Found</div>
    }
    else {
        return (
            <ul>
                {props.items.map(user => {
                    return (
                        <UserItem 
                            key={user.id} 
                            id={user.id} 
                            name={user.name} 
                            image={user.image} 
                            placeCount={user.places}
                        />
                    );
                })}
            </ul>
        );
    }
}

export default UsersList;