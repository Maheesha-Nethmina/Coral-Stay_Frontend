import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';


  

function AdminDash() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/addEvents');
  };
  return (
    <>
    <Navbar />
    <div>
        <br /><br /><br /><br />
        <h1>Admin Dash Board</h1>
        <p>Welcome to the admin dashboard!</p>
        <p>This is where you can manage users, view reports, and perform administrative tasks.</p>
        <button className='bg-[#023545] text-xl text-white px-3 py-3 rounded-lg hover:bg-[#06445f] transition-colors duration-300 w-[350px]' onClick={handleClick}>
      Go to Add Events
    </button>
    </div>
    </>
  )
}

export default AdminDash