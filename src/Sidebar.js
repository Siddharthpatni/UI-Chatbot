import React from "react";
import { FaHistory, FaCog, FaPlus, FaTimes, FaRobot } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar, onSettingsClick, chats, onChatSelect, onNewChat }) => {
  return (
    <div 
      className={`d-flex flex-column ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
      style={{
        width: isOpen ? "280px" : "0",
        backgroundColor: "#2d3748",
        color: "white",
        height: "100vh",
        overflowY: "auto",
        transition: "width 0.3s ease",
        position: "relative",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)"
      }}
    >
      {isOpen && (
        <>
          <div className="d-flex justify-content-between align-items-center p-4 border-bottom border-gray-700">
            <div className="d-flex align-items-center">
              <FaRobot className="me-2 text-blue-400" size={20} />
              <h4 className="m-0 font-weight-bold">Chat History</h4>
            </div>
            <button 
              onClick={toggleSidebar}
              className="btn btn-sm btn-outline-light p-1"
              aria-label="Close sidebar"
            >
              <FaTimes size={14} />
            </button>
          </div>

          <div className="p-3">
            <button
              onClick={onNewChat}
              className="btn btn-primary w-100 mb-4 d-flex align-items-center justify-content-center"
              style={{
                borderRadius: "8px",
                padding: "0.5rem 1rem",
                backgroundColor: "#4299e1",
                border: "none"
              }}
            >
              <FaPlus className="me-2" />
              New Chat
            </button>

            <div className="mb-4">
              <h6 className="text-gray-400 text-uppercase small mb-3 px-2">Recent Chats</h6>
              <div className="chat-list">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => onChatSelect(chat.id)}
                    className="d-flex align-items-center p-2 mb-1 rounded hover-bg-gray-700 cursor-pointer"
                    style={{
                      transition: "background-color 0.2s",
                      backgroundColor: "#2d3748"
                    }}
                  >
                    <div className="flex-grow-1 text-truncate">
                      {chat.name}
                    </div>
                    {chat.messages.length > 0 && (
                      <span className="badge bg-blue-500 rounded-pill ms-2">
                        {chat.messages.length}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto p-3 border-top border-gray-700">
            <button
              onClick={onSettingsClick}
              className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
              style={{
                borderRadius: "8px",
                padding: "0.5rem 1rem"
              }}
            >
              <FaCog className="me-2" />
              Settings
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;