import React, { useState, useRef } from "react";
import { FaBars, FaMoon, FaArrowLeft, FaSun, FaPaperclip, FaCog, FaPlus, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
import SettingsModal from "./SettingsModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 

// Configure PDF.js worker path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [chats, setChats] = useState([{ id: 1, name: "New Chat", messages: [] }]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [showHistory, setShowHistory] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Update current chat's messages with user message
    const updatedChats = chats.map(chat => {
      if (chat.id === currentChatId) {
        return {
          ...chat,
          messages: [...chat.messages, { text: input, sender: "user" }],
        };
      }
      return chat;
    });
    setChats(updatedChats);

    // Simulate a chatbot response
    setTimeout(() => {
      const chatbotResponse = {
        text: `I received your message: "${input}"${pdfFile ? "\n\nI also see you uploaded a PDF document." : ""}`,
        sender: "bot",
      };

      // Update chat with bot's response
      const updatedChatsWithBotResponse = chats.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, chatbotResponse],
          };
        }
        return chat;
      });
      setChats(updatedChatsWithBotResponse);
    }, 1000);

    setInput("");
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSaveProfile = (username) => {
    console.log("Saved Profile:", username);
  };

  const handleChangeLanguage = (language) => {
    console.log("Language changed to:", language);
  };

  const handleDeleteHistory = () => {
    const updatedChats = chats.map(chat => {
      if (chat.id === currentChatId) {
        return { ...chat, messages: [] };
      }
      return chat;
    });
    setChats(updatedChats);
    setPdfFile(null);
  };

  const handleNewChat = () => {
    const newChat = {
      id: chats.length + 1,
      name: `Chat ${chats.length + 1}`,
      messages: [],
    };
    setChats([...chats, newChat]);
    setCurrentChatId(newChat.id);
    setPdfFile(null);
  };

  const handleChatSelect = (chatId) => {
    setCurrentChatId(chatId);
    setPdfFile(null);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePdfPreview = () => {
    setPdfPreview(!pdfPreview);
  };

  const currentChat = chats.find(chat => chat.id === currentChatId);

  return (
    <div className={darkMode ? "bg-dark text-light min-vh-100" : "bg-light text-dark min-vh-100"}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 shadow-sm" style={{ position: "relative" }}>
        <div className="d-flex align-items-center">
          <FaBars
            size={20}
            className="text-white me-3"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ cursor: "pointer" }}
          />
          <span className="navbar-brand fw-bold">AI Chat Assistant</span>
        </div>
        
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-light me-2 d-flex align-items-center"
            onClick={handleNewChat}
          >
            <FaPlus className="me-1" /> New Chat
          </button>
          
          <button
            className="btn btn-outline-light me-2"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          
          <button
            className="btn btn-outline-light"
            onClick={handleSettingsClick}
          >
            <FaCog />
          </button>
          <div style={{ width: '110vh' }}></div>
          <Button  className="btn btn-outline-light" onClick={handleGoBack}>
            <FaArrowLeft className="me-2" />
            Back
          </Button>

        </div>
        
        
      </nav>
      
      <div className="d-flex" style={{ minHeight: "calc(100vh - 56px)" }}>
        {sidebarOpen && (
          <Sidebar
            isOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onSettingsClick={handleSettingsClick}
            chats={chats}
            onChatSelect={handleChatSelect}
            onNewChat={handleNewChat}
            darkMode={darkMode}
          />
        )}
        
        <div className="container-fluid p-0 d-flex flex-column" style={{ flex: 1 }}>
          {/* Chat area */}
          <div 
            className="flex-grow-1 p-3 overflow-auto" 
            style={{ 
              backgroundColor: darkMode ? "#343a40" : "#f8f9fa",
              position: "relative"
            }}
          >
            <div className="container-lg">
              {currentChat?.messages.length === 0 && (
                <div className="text-center py-5">
                  <h4 className="mb-4">Welcome to your new chat!</h4>
                  <p className="text-muted">Start a conversation or upload a PDF document</p>
                </div>
              )}
              
              {currentChat?.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex ${
                    msg.sender === "user" ? "justify-content-end" : "justify-content-start"
                  } mb-3`}
                >
                  <div
                    className={`p-3 rounded-3 ${
                      msg.sender === "user" 
                        ? darkMode ? "bg-primary text-white" : "bg-primary text-white"
                        : darkMode ? "bg-secondary text-white" : "bg-light text-dark"
                    }`}
                    style={{
                      maxWidth: "80%",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                    }}
                  >
                    <div className="d-flex align-items-center mb-1">
                      <strong className="me-2">
                        {msg.sender === "user" ? "You" : "Assistant"}
                      </strong>
                    </div>
                    <div style={{ whiteSpace: "pre-wrap" }}>{msg.text}</div>
                  </div>
                </div>
              ))}
              
              {pdfFile && (
                <div className="mt-4 mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5>Uploaded PDF</h5>
                    <div>
                      <button 
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={togglePdfPreview}
                      >
                        {pdfPreview ? "Hide" : "Show"} Preview
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setPdfFile(null)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  {pdfPreview && (
                    <div className="border rounded p-2 bg-white">
                      <Document
                        file={pdfFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading="Loading PDF..."
                      >
                        {Array.from(new Array(numPages), (el, index) => (
                          <Page 
                            key={`page_${index + 1}`} 
                            pageNumber={index + 1} 
                            width={600}
                            renderTextLayer={false}
                            className="mb-2 border-bottom"
                          />
                        ))}
                      </Document>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Input area */}
          <div 
            className="border-top p-3" 
            style={{ 
              backgroundColor: darkMode ? "#2c3034" : "#ffffff",
              boxShadow: "0 -2px 10px rgba(0,0,0,0.1)"
            }}
          >
            <div className="container-lg">
              <div className="input-group mb-2">
                <input
                  type="text"
                  className={`form-control ${darkMode ? "bg-dark text-light border-secondary" : ""}`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="application/pdf"
                  style={{ display: 'none' }}
                />
                <button 
                  className={`btn ${darkMode ? "btn-dark" : "btn-light"} border`}
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaPaperclip />
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSend}
                  disabled={input.trim() === ""}
                >
                  Send
                </button>
              </div>
              
              {pdfFile && (
                <div className="d-flex align-items-center">
                  <span className="text-muted small me-2">
                    PDF ready to send with message
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        show={showSettings}
        onHide={() => setShowSettings(false)}
        onSaveProfile={handleSaveProfile}
        onChangeLanguage={handleChangeLanguage}
        onDeleteHistory={handleDeleteHistory}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Chatbot;