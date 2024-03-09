import React from "react";

const CharacterCard = ({ character, onSelect, onEdit, onDelete, onExport }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{character.name}</h2>
      <p className="text-gray-600 mb-4">{character.description}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => onSelect(character)}
      >
        Select
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => onEdit(character)}
      >
        Edit
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => onDelete(character)}
      >
        Delete
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => onExport(character)}
      >
        Export
      </button>
    </div>
  );
};

export default CharacterCard;