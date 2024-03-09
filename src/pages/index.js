import React, { useState } from "react";
import Navbar from "/components/Navbar";
import Sidebar from "/components/Sidebar";
import ChatMessage from "/components/ChatMessage";
import ExportModal from "/components/ExportModal";
import { sendMessage } from "/utils/api";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrompt, setEditedPrompt] = useState("");

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage = {
        id: Date.now(),
        text: input,
        isUser: true,
      };
      setMessages([...messages, userMessage]);
      setInput("");

      const response = await sendMessage(input, selectedCharacter);
      const botMessage = {
        id: Date.now(),
        text: response.message,
        isUser: false,
      };
      setMessages([...messages, userMessage, botMessage]);
    }
  };

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    setMessages([]);
  };

  const handleEditCharacter = (character) => {
    setEditingCharacter(character);
    setEditedName(character.name);
    setEditedDescription(character.description);
    setEditedPrompt(character.prompt);
  };

  const handleSaveEditedCharacter = () => {
    const updatedCharacter = {
      ...editingCharacter,
      name: editedName,
      description: editedDescription,
      prompt: editedPrompt,
    };
    const updatedCharacters = characters.map((character) =>
      character.id === updatedCharacter.id ? updatedCharacter : character
    );
    setCharacters(updatedCharacters);
    setEditingCharacter(null);
    setEditedName("");
    setEditedDescription("");
    setEditedPrompt("");
  };

  const handleCancelEdit = () => {
    setEditingCharacter(null);
    setEditedName("");
    setEditedDescription("");
    setEditedPrompt("");
  };

  const handleDeleteCharacter = (character) => {
    const updatedCharacters = characters.filter(
      (c) => c.id !== character.id
    );
    setCharacters(updatedCharacters);
    if (selectedCharacter && selectedCharacter.id === character.id) {
      setSelectedCharacter(null);
      setMessages([]);
    }
  };

  const handleExportCharacter = (character) => {
    setShowExportModal(true);
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar
          characters={characters}
          onSelectCharacter={handleSelectCharacter}
          onEditCharacter={handleEditCharacter}
          onDeleteCharacter={handleDeleteCharacter}
          onExportCharacter={handleExportCharacter}
        />
        <div className="flex-1 p-4">
          {editingCharacter ? (
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Edit Character</h2>
              <div className="mb-2">
                <label htmlFor="name" className="block mb-1 font-bold">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="description" className="block mb-1 font-bold">
                  Description:
                </label>
                <textarea
                  id="description"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="prompt" className="block mb-1 font-bold">
                  Prompt:
                </label>
                <textarea
                  id="prompt"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={editedPrompt}
                  onChange={(e) => setEditedPrompt(e.target.value)}
                ></textarea>
              </div>
              <div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleSaveEditedCharacter}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                />
              ))}
            </div>
          )}
          {!editingCharacter && (
            <div className="flex">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded px-4 py-2 mr-2"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
      {showExportModal && (
        <ExportModal
          character={selectedCharacter}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};

export default Home;