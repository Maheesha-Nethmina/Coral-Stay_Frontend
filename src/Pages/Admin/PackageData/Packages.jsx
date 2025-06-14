import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';

function Packages({ pack, onDelete }) {
  if (!pack) return null;

  const { _id, title, description, price, days, offers, type, imageUrl } = pack;

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:3000/package/${_id}`);
      if (onDelete) onDelete(_id);
    } catch (error) {
      alert("Delete failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="overflow-x-auto w-full p-4">
      <div className="grid grid-cols-[100px_200px_150px_150px_80px_80px_120px_150px] gap-4 items-start border border-gray-200 rounded p-2 hover:bg-gray-50 text-sm text-left">
        <div className="break-words">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-16 h-16 object-cover rounded" />
          ) : (
            <span className="text-gray-400 italic">No Image</span>
          )}
        </div>
        <div className="break-words font-medium">{title}</div>
        <div className="break-words">{description}</div>
        <div className="break-words">Rs.{price}</div>
        <div className="break-words">{days} days</div>
        <div className="break-words">{offers || 'N/A'}</div>
        <div className="break-words font-semibold text-gray-600">{type}</div>
        <div className="flex gap-2">
          <Link
            to={`/packageDetails/${_id}`}
            className="text-blue-600 hover:text-blue-800"
            title="Edit Package"
          >
            <Pencil className="w-5 h-5" />
          </Link>
          <button
            onClick={deleteHandler}
            className="text-red-600 hover:text-red-800"
            title="Delete Package"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Packages;
