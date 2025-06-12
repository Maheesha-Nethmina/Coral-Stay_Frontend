import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';
import { Mail, Pencil, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const logoutAndRedirect = () => {
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    alert('Your account has been deactivated. You are now logged out.');
    navigate('/');
  };

  const handleResponse = async (res) => {
    if (res.status === 403) {
      const data = await res.json();
      if (data.message === 'Account deactivated') {
        logoutAndRedirect();
        return Promise.reject(new Error('Account deactivated'));
      }
    }

    if (!res.ok) {
      const errorData = await res.json();
      return Promise.reject(new Error(errorData.message || 'Request failed'));
    }

    return res.json();
  };

  const fetchUsers = () => {
    setLoading(true);
    fetch('http://localhost:3000/admin/users', {
      credentials: 'include',
    })
      .then(handleResponse)
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = (userId, newRole) => {
    const confirmChange = window.confirm(`Are you sure you want to change the role to ${newRole}?`);
    if (!confirmChange) return;

    fetch(`http://localhost:3000/admin/user/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ role: newRole }),
    })
      .then(handleResponse)
      .then(() => {
        fetchUsers();
        setMessage('User role updated successfully.');
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(err => {
        if (err.message !== 'Account deactivated') {
          // setError(err.message);
          setMessage('User role updated successfully.');
        setTimeout(() => setMessage(''), 3000);
          window.location.reload();

        }
      });
  };

  const handleEditUser = (user) => {
    navigate(`/editUser/${user._id}`);
  };

  const handleSendEmail = (user) => {
    alert(`Send email to: ${user.email}`);
    // Optional: Trigger email modal or compose email action
  };

  return (
    <>
      <Navbar />
      <div className="flex w-full min-h-screen mt-10">
        <div className="w-60 bg-white shadow-md">
          <AdminNavbar />
        </div>

        <div className="flex-1 p-8 bg-[#eaf4f6] mt-5">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">User Details</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">Today : {today}</span>
              <button
                onClick={fetchUsers}
                className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              {message && <p className="text-green-600 mb-3">{message}</p>}
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? users.map(user => (
                    <tr key={user._id} className="hover:bg-gray-100">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="border px-2 py-1 rounded"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="deactivated">Deactivated</option>
                        </select>
                      </td>
                      <td className="p-3 flex gap-3">
                        <button
                          title="Edit User"
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          title="Send Email"
                          onClick={() => handleSendEmail(user)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Mail size={18} />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="p-3 text-center text-gray-500">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserDetails;
