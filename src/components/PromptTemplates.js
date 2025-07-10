import React, { useState, useEffect } from 'react';
import { Button, Card, Form, ListGroup, Modal } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

const PromptTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState({ id: null, name: '', content: '' });

  useEffect(() => {
    // Load saved templates
    const savedTemplates = JSON.parse(localStorage.getItem('promptTemplates') || '[]');
    setTemplates(savedTemplates);
  }, []);

  const handleSave = () => {
    let updatedTemplates;
    if (currentTemplate.id !== null) {
      updatedTemplates = templates.map(t => 
        t.id === currentTemplate.id ? currentTemplate : t
      );
    } else {
      updatedTemplates = [...templates, {
        ...currentTemplate,
        id: Date.now()
      }];
    }
    
    setTemplates(updatedTemplates);
    localStorage.setItem('promptTemplates', JSON.stringify(updatedTemplates));
    setShowModal(false);
    setCurrentTemplate({ id: null, name: '', content: '' });
  };

  const handleDelete = (id) => {
    const updatedTemplates = templates.filter(t => t.id !== id);
    setTemplates(updatedTemplates);
    localStorage.setItem('promptTemplates', JSON.stringify(updatedTemplates));
  };

  return (
    <div className="container mt-4">
      <Button variant="outline-secondary" onClick={() => window.history.back()} className="mb-3">
        <FaArrowLeft className="me-2" /> Back
      </Button>

      <Card className="shadow">
        <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
          <h3>Prompt Templates</h3>
          <Button variant="light" onClick={() => setShowModal(true)}>
            <FaPlus className="me-1" /> Add Template
          </Button>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {templates.map(template => (
              <ListGroup.Item key={template.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{template.name}</h5>
                  <p className="text-muted">{template.content.substring(0, 100)}...</p>
                </div>
                <div>
                  <Button variant="outline-primary" size="sm" className="me-2"
                    onClick={() => {
                      setCurrentTemplate(template);
                      setShowModal(true);
                    }}
                  >
                    <FaEdit />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(template.id)}>
                    <FaTrash />
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentTemplate.id ? 'Edit Template' : 'Add New Template'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Template Name</Form.Label>
              <Form.Control
                type="text"
                value={currentTemplate.name}
                onChange={(e) => setCurrentTemplate({...currentTemplate, name: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Template Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={currentTemplate.content}
                onChange={(e) => setCurrentTemplate({...currentTemplate, content: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Template
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PromptTemplates;