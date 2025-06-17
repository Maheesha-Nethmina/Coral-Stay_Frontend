import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/admin/users`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        const foundUser = data.find(u => u._id === id);
        if (!foundUser) throw new Error('User not found');
        setUser(foundUser);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/admin/updateUser/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role,
      }),
    })
      .then(async res => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to update user');
        }
        return res.json();
      })
      .then(() => {
        setMessage('User updated successfully.');
        setTimeout(() => navigate('/userDetails'), 2000);
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-[#eaf4f6]">
        {/* Sidebar */}
        <div className="w-60 bg-white shadow-md mt-10">
          <AdminNavbar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex justify-center items-start mt-26 p-6">
          <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold text-[#023545] mb-6">Edit User</h1>

            {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
            {message && <p className="text-green-600 mb-4 text-sm">{message}</p>}

            {user ? (
              <form onSubmit={handleUpdate} className="space-y-5">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-black px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-black px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">Role</label>
                  <select
                    name="role"
                    value={user.role}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-black px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="deactivated">Deactivated</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#023545] hover:bg-[#023545]-400 text-white py-2 rounded transition duration-200"
                >
                  Update User
                </button>
              </form>
            ) : (
              <p className="text-gray-600">{loading ? 'Loading user data...' : 'User not found'}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUser;
