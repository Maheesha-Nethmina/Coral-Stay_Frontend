import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';

function Packages({ pack, onDelete }) {
  if (!pack) return null;

  const { _id, title, description, includes, price, days, offers, type, imageUrl, roomtype, seatNumber } = pack;

  const deleteHandler = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this package?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:3000/package/${_id}`);
      if (onDelete) onDelete(_id);
    } catch (error) {
      alert('Delete failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="w-full p-2">
      <div className="flex items-center text-sm text-left border border-gray-200 rounded p-2 hover:bg-gray-50">
        <div className="w-1/12">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-12 h-12 object-cover rounded" />
          ) : (
            <span className="text-gray-400 italic">No Image</span>
          )}
        </div>
        <div className="w-1/12 font-medium break-words">{title}</div>
        <div className="w-3/12 break-words">{description}</div>
        <div className="w-1/12 break-words">{includes}</div>
        <div className="w-1/12 break-words">Rs.{price}</div>
        <div className="w-1/12 break-words">{days}d</div>
        <div className="w-1/12 break-words text-[#2d6671] font-bold">{offers || 'N/A'}</div>
        <div className="w-1/12 font-semibold text-gray-600">{type}</div>
        <div className="w-1/12 font-semibold text-gray-600">{roomtype}</div>
        <div className="w-1/12 font-semibold text-gray-600">{seatNumber}</div>
        <div className="w-1/12 flex gap-2 items-center justify-center">
          <Link to={`/packageDetails/${_id}`} className="text-blue-600 hover:text-blue-800" title="Edit Package">
            <Pencil className="w-5 h-5" />
          </Link>
          <button onClick={deleteHandler} className="text-red-600 hover:text-red-800" title="Delete Package">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Packages;
