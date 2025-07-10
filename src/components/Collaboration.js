import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaUsers, FaUserPlus, FaShareAlt, FaComments, 
  FaUserCheck, FaUserTimes, FaLock, FaLockOpen, FaEdit
} from 'react-icons/fa';
import { 
  Button, Card, Container, Row, Col, 
  Form, Modal, ListGroup, Badge, Alert
} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';  // ✅ Correct import
import { useAuth } from './context/AuthContext'

const Collaboration = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('edit');
  const [chat, setChat] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch chat and collaborators data
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        setIsLoading(true);
        // Replace with actual API calls
        const chatData = await fetchChat(chatId);
        const collaboratorsData = await fetchCollaborators(chatId);
        
        setChat(chatData);
        setCollaborators(collaboratorsData);
        setMessages(chatData.messages || []);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchChatData();
  }, [chatId]);

  const fetchChat = async (id) => {
    // Mock data - replace with actual API call
    return {
      id,
      title: 'Team Project Discussion',
      owner: 'user1@example.com',
      isPrivate: false,
      createdAt: new Date().toISOString(),
      messages: [
        { id: 1, sender: 'user1@example.com', text: 'Let\'s discuss the project requirements', timestamp: new Date().toISOString() },
        { id: 2, sender: 'user2@example.com', text: 'I think we should focus on the UI first', timestamp: new Date().toISOString() }
      ]
    };
  };

  const fetchCollaborators = async (id) => {
    // Mock data - replace with actual API call
    return [
      { email: 'user1@example.com', role: 'owner', joinedAt: new Date().toISOString() },
      { email: 'user2@example.com', role: 'editor', joinedAt: new Date().toISOString() },
      { email: 'user3@example.com', role: 'viewer', joinedAt: new Date().toISOString() }
    ];
  };

  const handleInvite = async () => {
    if (!email) return;
    
    try {
      // Replace with actual API call
      const newCollaborator = {
        email,
        role: permission,
        joinedAt: new Date().toISOString()
      };
      
      setCollaborators([...collaborators, newCollaborator]);
      setEmail('');
      setShowInviteModal(false);
    } catch (err) {
      setError(`Failed to invite user: ${err.message}`);
    }
  };

  const handleRemoveCollaborator = async (emailToRemove) => {
    try {
      // Replace with actual API call
      setCollaborators(collaborators.filter(c => c.email !== emailToRemove));
    } catch (err) {
      setError(`Failed to remove collaborator: ${err.message}`);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      const message = {
        id: messages.length + 1,
        sender: currentUser.email,
        text: newMessage,
        timestamp: new Date().toISOString()
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Replace with actual API call to save message
    } catch (err) {
      setError(`Failed to send message: ${err.message}`);
    }
  };

  const toggleChatPrivacy = async () => {
    try {
      const updatedChat = { ...chat, isPrivate: !chat.isPrivate };
      setChat(updatedChat);
      
      // Replace with actual API call to update chat privacy
    } catch (err) {
      setError(`Failed to update privacy: ${err.message}`);
    }
  };

  if (isLoading) return <Container className="py-5 text-center"><p>Loading collaboration...</p></Container>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="py-4 collaboration-container">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>
              <FaUsers className="me-2 text-primary" />
              {chat?.title || 'Collaboration'}
            </h2>
            <div>
              <Button 
                variant={chat?.isPrivate ? 'danger' : 'success'} 
                onClick={toggleChatPrivacy}
                className="me-2"
              >
                {chat?.isPrivate ? <FaLock /> : <FaLockOpen />}
                {chat?.isPrivate ? ' Private' : ' Public'}
              </Button>
              <Button 
                variant="primary" 
                onClick={() => setShowInviteModal(true)}
              >
                <FaUserPlus className="me-1" />
                Invite
              </Button>
            </div>
          </div>
          <p className="text-muted">
            Owned by: {chat?.owner === currentUser.email ? 'You' : chat?.owner}
          </p>
        </Col>
      </Row>

      <Row>
        {/* Chat Messages Column */}
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span><FaComments className="me-2" />Discussion</span>
              <Badge bg="secondary">{messages.length} messages</Badge>
            </Card.Header>
            <Card.Body className="chat-messages" style={{ height: '400px', overflowY: 'auto' }}>
              {messages.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`mb-3 ${msg.sender === currentUser.email ? 'text-end' : ''}`}
                  >
                    <div 
                      className={`d-inline-block p-3 rounded ${msg.sender === currentUser.email ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                      style={{ maxWidth: '80%' }}
                    >
                      <div className="small text-muted mb-1">
                        {msg.sender === currentUser.email ? 'You' : msg.sender.split('@')[0]}
                      </div>
                      <div>{msg.text}</div>
                      <div className="small text-muted mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </Card.Body>
            <Card.Footer>
              <Form.Group>
                <div className="d-flex">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="me-2"
                  />
                  <Button 
                    variant="primary" 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    Send
                  </Button>
                </div>
              </Form.Group>
            </Card.Footer>
          </Card>
        </Col>

        {/* Collaborators Column */}
        <Col md={4}>
          <Card>
            <Card.Header>
              <FaUsers className="me-2" />
              Collaborators ({collaborators.length})
            </Card.Header>
            <Card.Body style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <ListGroup variant="flush">
                {collaborators.map((collab, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="fw-bold">{collab.email}</span>
                      <div className="small text-muted">
                        {collab.role === 'owner' ? 'Owner' : collab.role === 'editor' ? 'Can edit' : 'Can view'}
                      </div>
                    </div>
                    {collab.role !== 'owner' && chat?.owner === currentUser.email && (
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleRemoveCollaborator(collab.email)}
                      >
                        <FaUserTimes />
                      </Button>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header>
              <FaShareAlt className="me-2" />
              Share Options
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Shareable Link</Form.Label>
                 <InputGroup>
                  <Form.Control
                    type="text"
                    value={`${window.location.origin}/collaborate/${chatId}`}
                    readOnly
                  />
                  <Button 
                    variant="outline-secondary"
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/collaborate/${chatId}`);
                      alert('Link copied to clipboard!');
                    }}
                  >
                    Copy
                  </Button>
                </InputGroup>
              </Form.Group>
              <div className="d-grid">
                <Button variant="outline-primary">
                  <FaEdit className="me-1" />
                  Edit Chat Title
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Invite Modal */}
      <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Invite Collaborator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Permissions</Form.Label>
              <Form.Select 
                value={permission}
                onChange={(e) => setPermission(e.target.value)}
              >
                <option value="edit">Can edit</option>
                <option value="view">Can view</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInviteModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleInvite}>
            Send Invitation
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Collaboration;