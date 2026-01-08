import { useState, useEffect } from 'react';
import { userApi } from '../services/api';
import type { User } from '../services/api';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userApi.getAll();
      setUsers(response.data);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userApi.delete(id);
        setUsers(users.filter(u => u.id !== id));
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  if (loading) {
    return (
      <div className="user-list-loading">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-error-container">
        <div className="user-list-error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">User Directory</h2>
      {users.length === 0 ? (
        <p className="user-list-empty">
          No users found. Add your first user to get started!
        </p>
      ) : (
        <div className="user-list-table-wrapper">
          <table className="user-list-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="name">
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber || '-'}</td>
                  <td>{user.department || '-'}</td>
                  <td className="actions">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="user-list-delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;