import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCog, FaArrowLeft, FaInfoCircle, FaGithub, FaSearch, FaFileAlt, FaLayerGroup, FaFileExport, FaRobot,FaLightbulb, FaBook, FaCode, FaUsers } from 'react-icons/fa';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

const MainPage = () => {
  const navigate = useNavigate();

  // Feature cards data
  const features = [
    {
      icon: <FaRobot size={24} className="text-primary" />,
      title: "Multi-Model AI",
      description: "Switch between GPT-4, Claude, Gemini and more",
      action: () => navigate('/model-switcher'),
      color: "primary"
    },
    {
      icon: <FaSearch size={24} className="text-info" />,
      title: "Web Search",
      description: "Get real-time information from the web",
      action: () => navigate('/web-search'),
      color: "info"
    },
    {
      icon: <FaFileAlt size={24} className="text-success" />,
      title: "Document Q&A",
      description: "Upload and ask questions about your documents",
      action: () => navigate('/document-qa'),
      color: "success"
    },
    {
      icon: <FaLayerGroup size={24} className="text-warning" />,
      title: "Prompt Templates",
      description: "Save and reuse your favorite prompts",
      action: () => navigate('/prompt-templates'),
      color: "warning"
    },
    {
      icon: <FaFileExport size={24} className="text-danger" />,
      title: "Export Chats",
      description: "Download conversations in multiple formats",
      action: () => navigate('/export-chat'),
      color: "danger"
    },
    {
      icon: <FaUsers size={24} className="text-secondary" />,
      title: "Collaboration",
      description: "Share and work on chats with your team",
      action: () => {},
      color: "secondary"
    }
  ];

  const quickActions = [
    { 
      name: "New Chat", 
      icon: <FaPlus />, 
      action: () => navigate('/chat'),
      variant: "outline-primary"
    },
    { 
      name: "API Settings", 
      icon: <FaCog />, 
      action: () => navigate('/api'),
      variant: "outline-secondary"
    },
    { 
      name: "Code Assistant", 
      icon: <FaCode />, 
      action: () => navigate('/code-assistant'),
      variant: "outline-success"
    }
  ];

  return (
    <Container className="main-page-container py-4">
      {/* Header */}
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold text-gradient mb-3">
          <span className="text-primary">AI</span> Chat Assistant
        </h1>
        <p className="lead text-muted">
          Your intelligent companion for work, research, and creativity
        </p>
      </header>

      {/* Quick Actions */}
      <div className="quick-actions mb-5">
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              onClick={action.action}
              className="px-4 py-3 d-flex align-items-center action-button"
            >
              <span className="action-icon">{action.icon}</span>
              <span className="ms-2">{action.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-section mb-5">
        <h3 className="text-center mb-4 section-title">
          <FaLightbulb className="me-2 text-warning" />
          Powerful Features
        </h3>
        
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={4}>
              <Card 
                className={`feature-card h-100 border-${feature.color} hover-shadow`}
                onClick={feature.action}
              >
                <Card.Body className="text-center">
                  <div className={`icon-wrapper bg-${feature.color}-subtle mb-3`}>
                    {feature.icon}
                  </div>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {feature.description}
                  </Card.Text>
                  <Button 
                    variant={`outline-${feature.color}`} 
                    size="sm"
                    className="mt-2"
                  >
                    Explore
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity mb-5">
        <h3 className="text-center mb-4 section-title">
          <FaBook className="me-2 text-info" />
          Recent Chats
        </h3>
        <Card className="shadow-sm">
          <Card.Body className="text-center py-5">
            <p className="text-muted">Your recent conversations will appear here</p>
            <Button variant="outline-primary" onClick={() => navigate('/chat')}>
              Start New Conversation
            </Button>
          </Card.Body>
        </Card>
      </div>

      {/* Footer */}
      <footer className="text-center border-top pt-4">
        <div className="d-flex justify-content-center gap-3 mb-3">
          <Button 
            variant="link" 
            onClick={() => navigate('/about')}
            className="text-muted"
          >
            <FaInfoCircle className="me-2" />
            About
          </Button>
          <Button 
            variant="link" 
            href="https://github.com"
            target="_blank"
            className="text-muted"
          >
            <FaGithub className="me-2" />
            GitHub
          </Button>
        </div>
        <small className="text-muted">
          AI Chat Assistant v1.0 · © {new Date().getFullYear()}
        </small>
      </footer>
    </Container>
  );
};

export default MainPage;