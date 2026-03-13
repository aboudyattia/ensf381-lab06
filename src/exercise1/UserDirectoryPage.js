import Controls from './Controls';
import sampleUsers from './sampleUsers';
import UserList from './UserList';
import React, { useState, useEffect} from 'react'

function UserDirectoryPage() {
  // TODO: add users, sortBy, and viewMode state in this component.
  // TODO: fetch the initial users with useEffect.
  
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('ID');
  const [viewMode, setViewMode] = useState("grid");

  function retrieveData() {
    fetch('https://69a1df572e82ee536fa26e9c.mockapi.io/users_api')
    .then((response) => response.json())
    .then((data) => {
        setUsers(data);
    })
    .catch((e) => {
      console.log('Failed to fetch data: ' , e.message);

    })

  }

  useEffect(() => { retrieveData();},[users]);

  function handleDeleteClick(userId) {
    console.log('TODO: delete the user with id', userId);
  }

  function handleSortByGroupClick() {
    console.log('TODO: sort users by user_group');
  }

  function handleSortByIdClick() {
    console.log('TODO: sort users by id');
  }

  function handleViewToggleClick() {
    console.log('TODO: switch between grid and list layouts');
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls />
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;
