import React, { useState, useEffect } from 'react';
import { Button, Card, Form, ListGroup, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaCheck, FaRobot } from 'react-icons/fa';

const ModelSwitcher = () => {
  const [models, setModels] = useState([
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', active: false },
    { id: 'claude-2', name: 'Claude 2', provider: 'Anthropic', active: false },
    { id: 'llama-2', name: 'Llama 2', provider: 'Meta', active: false },
    { id: 'gemini', name: 'Gemini', provider: 'Google', active: false }
  ]);
  const [apiKeys, setApiKeys] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load saved settings
    const savedSettings = JSON.parse(localStorage.getItem('modelSettings') || '{}');
    if (savedSettings.activeModel) {
      setModels(models.map(m => ({
        ...m,
        active: m.id === savedSettings.activeModel
      })));
    }
    setApiKeys(savedSettings.apiKeys || {});
  }, []);

  const handleModelChange = (modelId) => {
    const updatedModels = models.map(model => ({
      ...model,
      active: model.id === modelId
    }));
    setModels(updatedModels);
    
    const settings = {
      activeModel: modelId,
      apiKeys
    };
    localStorage.setItem('modelSettings', JSON.stringify(settings));
  };

  const handleApiKeyChange = (modelId, key) => {
    const updatedKeys = { ...apiKeys, [modelId]: key };
    setApiKeys(updatedKeys);
    
    const settings = {
      activeModel: models.find(m => m.active)?.id,
      apiKeys: updatedKeys
    };
    localStorage.setItem('modelSettings', JSON.stringify(settings));
  };

  const testConnection = async (modelId) => {
    setError(null);
    try {
      const response = await fetch('/api/test-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelId,
          apiKey: apiKeys[modelId]
        })
      });
      if (!response.ok) throw new Error('Connection failed');
      alert(`Connection to ${modelId} successful!`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <Button variant="outline-secondary" onClick={() => window.history.back()} className="mb-3">
        <FaArrowLeft className="me-2" /> Back
      </Button>

      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h3><FaRobot className="me-2" />AI Model Switcher</h3>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <ListGroup>
            {models.map(model => (
              <ListGroup.Item key={model.id}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <h5>{model.name}</h5>
                    <small className="text-muted">{model.provider}</small>
                  </div>
                  <Button
                    variant={model.active ? 'success' : 'outline-secondary'}
                    onClick={() => handleModelChange(model.id)}
                  >
                    {model.active ? <FaCheck className="me-1" /> : null}
                    {model.active ? 'Active' : 'Select'}
                  </Button>
                </div>
                
                <Form.Group>
                  <Form.Label>API Key</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="password"
                      value={apiKeys[model.id] || ''}
                      onChange={(e) => handleApiKeyChange(model.id, e.target.value)}
                      placeholder={`Enter ${model.name} API key`}
                    />
                    <Button 
                      variant="outline-primary" 
                      className="ms-2"
                      onClick={() => testConnection(model.id)}
                      disabled={!apiKeys[model.id]}
                    >
                      Test
                    </Button>
                  </div>
                </Form.Group>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ModelSwitcher;