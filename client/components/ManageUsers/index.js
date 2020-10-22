import { useState } from 'react';
import SearchUsers from '@/Components/User/SearchUsers';
import UserItem from './UserItem';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const handleSetHits = hits => setUsers(hits);

  return (
    <div
      style={{
        maxWidth: '800px',
      }}>
      <SearchUsers setHits={handleSetHits} filters="" />
      {users.length === 0 && 'NO USERS FOUND'}
      {users.map((usr, idx) => (
        <UserItem key={usr.id} user={usr} />
      ))}
    </div>
  );
};

export default ManageUsers;
