import React, { useState, useEffect } from 'react';
import { Button, Card, Form, ListGroup, Spinner } from 'react-bootstrap';
import { FaArrowLeft, FaFileExport, FaFilePdf, FaFileWord, FaFileAlt } from 'react-icons/fa';

const ExportChat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [format, setFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // Load chat history
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    setChats(chatHistory);
  }, []);

  const handleExport = () => {
    if (!selectedChat) return;
    
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      let content = '';
      const chat = chats.find(c => c.id === selectedChat);
      
      if (format === 'pdf') {
        content = `PDF Export for: ${chat.name}\n\n`;
      } else if (format === 'docx') {
        content = `Word Export for: ${chat.name}\n\n`;
      } else {
        content = `Text Export for: ${chat.name}\n\n`;
      }
      
      chat.messages.forEach(msg => {
        content += `${msg.sender}: ${msg.text}\n\n`;
      });
      
      // In a real app, you would generate actual files here
      console.log('Exporting:', content);
      alert(`Exported chat to ${format.toUpperCase()} format`);
      setIsExporting(false);
    }, 1500);
  };

  return (
    <div className="container mt-4">
      <Button variant="outline-secondary" onClick={() => window.history.back()} className="mb-3">
        <FaArrowLeft className="me-2" /> Back
      </Button>

      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h3><FaFileExport className="me-2" />Export Conversations</h3>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Chat</Form.Label>
              <Form.Select 
                value={selectedChat || ''}
                onChange={(e) => setSelectedChat(e.target.value)}
              >
                <option value="">Select a conversation</option>
                {chats.map(chat => (
                  <option key={chat.id} value={chat.id}>{chat.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Export Format</Form.Label>
              <div className="d-flex gap-3">
                <Button
                  variant={format === 'pdf' ? 'primary' : 'outline-primary'}
                  onClick={() => setFormat('pdf')}
                >
                  <FaFilePdf className="me-2" /> PDF
                </Button>
                <Button
                  variant={format === 'docx' ? 'primary' : 'outline-primary'}
                  onClick={() => setFormat('docx')}
                >
                  <FaFileWord className="me-2" /> Word
                </Button>
                <Button
                  variant={format === 'txt' ? 'primary' : 'outline-primary'}
                  onClick={() => setFormat('txt')}
                >
                  <FaFileAlt className="me-2" /> Text
                </Button>
              </div>
            </Form.Group>

            <Button 
              variant="success" 
              onClick={handleExport}
              disabled={!selectedChat || isExporting}
              className="w-100 py-2"
            >
              {isExporting ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <>
                  <FaFileExport className="me-2" /> Export Chat
                </>
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExportChat;