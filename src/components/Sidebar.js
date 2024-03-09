import React from "react";
import CharacterCard from "./CharacterCard";

const Sidebar = ({
  characters,
  onSelectCharacter,
  onEditCharacter,
  onDeleteCharacter,
  onExportCharacter,
}) => {
  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Characters</h2>
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onSelect={onSelectCharacter}
          onEdit={onEditCharacter}
          onDelete={onDeleteCharacter}
          onExport={onExportCharacter}
        />
      ))}
    </div>
  );
};

export default Sidebar;