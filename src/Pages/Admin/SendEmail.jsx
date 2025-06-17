import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';

function SendEmail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch selected user details
    fetch(`http://localhost:3000/admin/users`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        const selectedUser = data.find(u => u._id === id);
        if (selectedUser) {
          setUser(selectedUser);
        } else {
          setStatus('User not found');
        }
      })
      .catch(err => {
        console.error(err);
        setStatus('Failed to load user data');
      });
  }, [id]);

  const handleSend = () => {
    if (!message || !subject) {
      setStatus('Please fill in all fields');
      return;
    }

    fetch('http://localhost:3000/admin/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: user.email,
        subject,
        message,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setStatus(data.message);
        setTimeout(() => navigate('/userDetails'), 2000);
      })
      .catch(err => {
        console.error(err);
        setStatus('Failed to send email');
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
          <h1 className="text-2xl font-bold text-[#023545] mb-4">Send Email</h1>

          {user ? (
            <>
              <p className="mb-4 text-sm text-gray-700">
                <strong>To:</strong> {user.name} ({user.email})
              </p>
              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-black px-4 py-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                placeholder="Enter your message"
                className="w-full border border-black px-4 py-2 mb-4 rounded resize-none h-36 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={handleSend}
                className="w-full bg-[#023545] hover:bg-[#023545]-400 text-white py-2 rounded transition duration-200 coursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Email
              </button>
              {status && <p className="mt-4 text-green-600 text-sm">{status}</p>}
            </>
          ) : (
            <p className="text-gray-600">{status || 'Loading user info...'}</p>
          )}
        </div>
      </div>
    </div>
  </>
);

}

export default SendEmail;
