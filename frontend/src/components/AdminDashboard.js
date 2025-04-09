import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { FaTrash } from 'react-icons/fa';
import Navbar from './navbar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/all`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      
      if (response.ok) {
        setUsers(json);
      } else {
        setError(json.error);
      }
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ role: newRole })
      });

      const json = await response.json();
      
      if (response.ok) {
        setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
        setSuccessMessage('User role updated successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(json.error);
      }
    } catch (err) {
      setError('Failed to update user role');
    }
  };

  const handleDeleteClick = () => {
    if (!selectedUser) {
      setError('Please select a user to delete');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/${selectedUser._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        setUsers(users.filter(u => u._id !== selectedUser._id));
        setSuccessMessage(`User ${selectedUser.username} deleted successfully`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const json = await response.json();
        setError(json.error);
      }
    } catch (err) {
      setError('Failed to delete user');
    } finally {
      setShowConfirmation(false);
      setSelectedUser(null);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div>
        <Navbar />
        <div className="admin-dashboard">
          <h2>Access Denied</h2>
          <p>You must be an admin to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>
          <div className="stat-card">
            <h3>Admin Users</h3>
            <p>{users.filter(u => u.role === 'admin').length}</p>
          </div>
        </div>

        <div className="users-list">
          <h3>All Users</h3>
          <div className="delete-user-section">
            <select 
              value={selectedUser?._id || ''} 
              onChange={(e) => {
                const selected = users.find(u => u._id === e.target.value);
                setSelectedUser(selected || null);
              }}
              className="user-select"
            >
              <option value="">Select a user to delete</option>
              {users.filter(u => u._id !== user._id).map(u => (
                <option key={u._id} value={u._id}>
                  {u.username} ({u.email})
                </option>
              ))}
            </select>
            <button 
              className="delete-btn"
              onClick={handleDeleteClick}
              disabled={!selectedUser}
              title={!selectedUser ? "Select a user to delete" : `Delete user ${selectedUser.username}`}
            >
              <FaTrash />
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className={`user-row ${selectedUser?._id === u._id ? 'selected' : ''}`}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      disabled={u._id === user._id}
                      className="role-select"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showConfirmation && selectedUser && (
          <div className="confirmation-modal">
            <div className="modal-content">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete user:</p>
              <div className="user-details">
                <p><strong>Username:</strong> {selectedUser.username}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
              </div>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowConfirmation(false)}>
                  Cancel
                </button>
                <button className="confirm-delete-btn" onClick={handleConfirmDelete}>
                  Delete User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;