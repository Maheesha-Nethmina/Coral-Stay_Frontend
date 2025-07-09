import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';

function Event({ event, onDelete }) {
  if (!event) return null;

  const { _id, title, description, date, mapUrl, imageUrl } = event;

  const deleteHandler = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:3000/events/${_id}`);
      if (onDelete) onDelete(_id);
    } catch (error) {
      alert("Delete failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
    
        <div className="overflow-x-auto w-full p-4">
  
      <div className="grid grid-cols-[100px_200px_150px_1.5fr_120px_200px_100px] gap-4 items-start border border-gray-200 rounded p-2 hover:bg-gray-50 text-sm text-left">
        <div className="break-words">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-16 h-16 object-cover rounded" />
          ) : (
            <span className="text-gray-400 italic">No Image</span>
          )}
        </div>
        <div className="break-words font-medium">{title}</div>
        <div className="break-words ">{description}</div>
        <div className="break-words text-gray-500">{date ? date.slice(0, 10) : ''}</div>
        <div className="break-words text-blue-600 underline"><a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#337ece] hover:underline"
              >{mapUrl}</a></div>
        <div className="flex gap-2">
          <Link
            to={`/eventDetails/${_id}`}
            className="text-blue-600 hover:text-blue-800"
            title="Edit Event"
          >
            <Pencil className="w-5 h-5" />
          </Link>
          <button
            onClick={deleteHandler}
            className="text-red-600 hover:text-red-800"
            title="Delete Event"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Event;
