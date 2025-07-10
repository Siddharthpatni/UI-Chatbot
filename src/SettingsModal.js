import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { FaUser, FaLanguage, FaTrashAlt, FaSave, FaTimes } from "react-icons/fa";

const SettingsModal = ({ show, onHide, onSaveProfile, onChangeLanguage, onDeleteHistory }) => {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("en");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveProfile = () => {
    onSaveProfile(username);
    onChangeLanguage(language);
    onHide();
  };

  const handleDeleteConfirmed = () => {
    onDeleteHistory();
    setShowDeleteConfirm(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="fw-bold">Settings</Modal.Title>
        <button 
          onClick={onHide} 
          className="btn-close" 
          aria-label="Close"
          style={{ fontSize: '0.75rem' }}
        />
      </Modal.Header>
      
      <Modal.Body className="pt-0">
        <div className="mb-4">
          <div className="d-flex align-items-center mb-3">
            <FaUser className="me-2 text-primary" size={18} />
            <h5 className="m-0">User Profile</h5>
          </div>
          
          <Form.Group className="mb-3">
            <Form.Label className="small text-muted">Display Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-2 px-3 rounded-3"
            />
            <Form.Text className="text-muted">
              This name will appear in your chat sessions
            </Form.Text>
          </Form.Group>
        </div>

        <div className="mb-4">
          <div className="d-flex align-items-center mb-3">
            <FaLanguage className="me-2 text-primary" size={18} />
            <h5 className="m-0">Language Preferences</h5>
          </div>
          
          <Form.Group className="mb-3">
            <Form.Label className="small text-muted">Interface Language</Form.Label>
            <Form.Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="py-2 px-3 rounded-3"
            >
              <option value="en">English</option>
              <option value="es">Español (Spanish)</option>
              <option value="fr">Français (French)</option>
              <option value="de">Deutsch (German)</option>
              <option value="ja">日本語 (Japanese)</option>
              <option value="zh">中文 (Chinese)</option>
            </Form.Select>
          </Form.Group>
        </div>

        <div className="mb-3">
          <div className="d-flex align-items-center mb-3">
            <FaTrashAlt className="me-2 text-primary" size={18} />
            <h5 className="m-0">Data Management</h5>
          </div>
          
          {showDeleteConfirm ? (
            <Alert variant="danger" className="rounded-3">
              <Alert.Heading>Confirm Deletion</Alert.Heading>
              <p>Are you sure you want to delete all chat history? This action cannot be undone.</p>
              <div className="d-flex justify-content-end gap-2">
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={handleDeleteConfirmed}
                >
                  Delete All
                </Button>
              </div>
            </Alert>
          ) : (
            <Button 
              variant="outline-danger" 
              className="w-100 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <FaTrashAlt /> Clear All Chat History
            </Button>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button 
          variant="outline-secondary" 
          onClick={onHide}
          className="rounded-3 px-4"
        >
          <FaTimes className="me-2" /> Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSaveProfile}
          className="rounded-3 px-4"
        >
          <FaSave className="me-2" /> Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;