import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Alert, Spinner, InputGroup, Navbar, Container, Nav } from 'react-bootstrap';
import { FaSave, FaTrash, FaCheck, FaPlug, FaInfoCircle, FaArrowLeft, FaHome } from 'react-icons/fa';

const ApiSettings = () => {
  const navigate = useNavigate();
  const [customApiUrl, setCustomApiUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // Load saved API URL on component mount
  useEffect(() => {
    const savedUrl = localStorage.getItem('customApiUrl');
    if (savedUrl) {
      setCustomApiUrl(savedUrl);
    }
  }, []);

  const handleApiUrlChange = (event) => {
    setCustomApiUrl(event.target.value);
    setTestResult(null);
  };

  const handleSaveApiUrl = () => {
    if (!customApiUrl) {
      showAlertMessage('Please enter a valid API URL', 'danger');
      return;
    }

    localStorage.setItem('customApiUrl', customApiUrl);
    showAlertMessage('API URL saved successfully!', 'success');
  };

  const handleResetApiUrl = () => {
    localStorage.removeItem('customApiUrl');
    setCustomApiUrl('');
    showAlertMessage('API URL reset to default', 'info');
    setTestResult(null);
  };

  const testApiConnection = async () => {
    if (!customApiUrl) {
      showAlertMessage('Please enter a valid API URL first', 'danger');
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      // Simple HEAD request to test if endpoint exists
      const response = await fetch(customApiUrl, { method: 'HEAD' });
      setTestResult({
        success: response.ok,
        status: response.status,
        statusText: response.statusText
      });
      showAlertMessage(
        response.ok 
          ? 'API connection successful!' 
          : `API responded with status: ${response.status}`,
        response.ok ? 'success' : 'warning'
      );
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message
      });
      showAlertMessage(`Connection failed: ${error.message}`, 'danger');
    } finally {
      setIsTesting(false);
    }
  };

  const showAlertMessage = (message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleGoHome = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center">
            <Button 
              variant="outline-light" 
              onClick={handleGoBack}
              className="me-2 d-flex align-items-center"
            >
              <FaArrowLeft />
            </Button>
            <span className="ms-2">API Settings</span>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Button 
              variant="outline-light" 
              onClick={handleGoHome}
              className="d-flex align-items-center"
            >
              <FaHome className="me-1" />
              Home
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="flex-grow-1 py-4">
        <Card className="shadow-sm">
          <Card.Header className="bg-white">
            <h2 className="mb-0 d-flex align-items-center">
              <FaPlug className="me-2 text-primary" />
              API Connection Settings
            </h2>
          </Card.Header>
          
          <Card.Body>
            {showAlert && (
              <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                {alertMessage}
              </Alert>
            )}

            <Form.Group className="mb-4">
              <Form.Label>API Endpoint URL</Form.Label>
              <InputGroup>
                <Form.Control
                  type="url"
                  value={customApiUrl}
                  onChange={handleApiUrlChange}
                  placeholder="https://api.example.com/v1/endpoint"
                  className="py-2"
                />
              </InputGroup>
              <Form.Text className="text-muted">
                Enter the full URL of your custom API endpoint
              </Form.Text>
            </Form.Group>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <Button 
                variant="primary" 
                onClick={handleSaveApiUrl}
                disabled={!customApiUrl}
                className="d-flex align-items-center px-4"
              >
                <FaSave className="me-2" />
                Save Settings
              </Button>
              
              <Button 
                variant="outline-secondary" 
                onClick={testApiConnection}
                disabled={!customApiUrl || isTesting}
                className="d-flex align-items-center px-4"
              >
                {isTesting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Testing...
                  </>
                ) : (
                  <>
                    <FaCheck className="me-2" />
                    Test Connection
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline-danger" 
                onClick={handleResetApiUrl}
                className="d-flex align-items-center px-4"
              >
                <FaTrash className="me-2" />
                Reset to Default
              </Button>
            </div>

            {testResult && (
              <Card className={`border-${testResult.success ? 'success' : 'danger'} mb-4`}>
                <Card.Body>
                  <Card.Title className={`text-${testResult.success ? 'success' : 'danger'}`}>
                    {testResult.success ? 'Connection Successful' : 'Connection Failed'}
                  </Card.Title>
                  {testResult.success ? (
                    <Card.Text>
                      API endpoint responded successfully (Status: {testResult.status})
                    </Card.Text>
                  ) : (
                    <Card.Text>
                      {testResult.error || `API responded with status: ${testResult.status} - ${testResult.statusText}`}
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            )}

            <Card className="border-info">
              <Card.Body>
                <Card.Title className="text-info">
                  <FaInfoCircle className="me-2" />
                  API Configuration Notes
                </Card.Title>
                <ul className="mb-0">
                  <li>Ensure your API endpoint supports CORS if accessing from a browser</li>
                  <li>The endpoint should accept POST requests with JSON payload</li>
                  <li>For testing, you can use public APIs like JSONPlaceholder</li>
                  <li>Saved settings persist between sessions</li>
                </ul>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ApiSettings;