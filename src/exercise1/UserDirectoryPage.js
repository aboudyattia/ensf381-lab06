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
        console.log('data fetched')
    })
    .catch((e) => {
      console.log('Failed to fetch data: ' , e.message);

    })

  }

  useEffect(() => { retrieveData();},[]);

  async function handleDeleteClick(userId) {
    console.log('Delete: ', userId );
    try {
      const response = await fetch(
        `https://69a1df572e82ee536fa26e9c.mockapi.io/users_api/${userId}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
      setUsers(users.filter(user => user.id !== userId));
      }

    } catch (error) {
      console.error(error);
    }
  }

  function handleSortByGroupClick() {
    console.log('sort users by group');

    const sortedByGroup = [...users].sort((a, b) => Number(a.user_group) - Number(b.user_group));
    setUsers(sortedByGroup);
    setSortBy("group");
  }

  function handleSortByIdClick() {
    console.log('sort users by id');

    const sortedById = [...users].sort((a, b) => Number(a.id) - Number(b.id));
    setUsers(sortedById);
    setSortBy("ID");
}

  function handleViewToggleClick() {
    console.log('switch between grid and list layouts');
    if (viewMode == 'grid'){
      setViewMode('list')
      console.log(viewMode)
    }
    else {
      setViewMode('grid')
      console.log(viewMode)

    }
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls
          onDeleteClick={handleDeleteClick}
          onSortByGroupClick={handleSortByGroupClick}
          onSortByIdClick={handleSortByIdClick}
          onViewToggleClick={handleViewToggleClick}
        />
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;
