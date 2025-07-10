import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Alert, Spinner, Tab, Tabs, Modal } from 'react-bootstrap';
import { FaCode, FaPlay, FaCopy, FaSave, FaArrowLeft } from 'react-icons/fa';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as beautify from 'js-beautify';

const CodeAssistant = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedSnippets, setSavedSnippets] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [snippetName, setSnippetName] = useState('');
  const codeEditorRef = useRef(null);

  // Load saved snippets from localStorage
  useEffect(() => {
    const snippets = JSON.parse(localStorage.getItem('codeSnippets') || '[]');
    setSavedSnippets(snippets);
  }, []);

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
  ];

  const handleExecute = async () => {
    if (!code.trim()) {
      setError('Please enter some code to execute');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Mock execution - replace with actual API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOutput(`Code executed successfully.\n\nSample output for ${language} code:\n\n${code.substring(0, 100)}...`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormat = () => {
    try {
      if (language === 'javascript') {
        setCode(beautify.js(code, { indent_size: 2 }));
      } else if (language === 'html') {
        setCode(beautify.html(code, { indent_size: 2 }));
      } else if (language === 'css') {
        setCode(beautify.css(code, { indent_size: 2 }));
      } else {
        setError('Auto-formatting not supported for this language');
      }
    } catch (err) {
      setError('Formatting failed: ' + err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleSaveSnippet = () => {
    if (!snippetName.trim()) {
      setError('Please enter a name for your snippet');
      return;
    }

    const newSnippet = {
      id: Date.now(),
      name: snippetName,
      code,
      language,
      createdAt: new Date().toISOString()
    };

    const updatedSnippets = [...savedSnippets, newSnippet];
    setSavedSnippets(updatedSnippets);
    localStorage.setItem('codeSnippets', JSON.stringify(updatedSnippets));
    setShowSaveModal(false);
    setSnippetName('');
    setError(null);
  };

  const handleLoadSnippet = (snippet) => {
    setCode(snippet.code);
    setLanguage(snippet.language);
    setOutput('');
    setError(null);
  };

  const handleDeleteSnippet = (id) => {
    const updatedSnippets = savedSnippets.filter(s => s.id !== id);
    setSavedSnippets(updatedSnippets);
    localStorage.setItem('codeSnippets', JSON.stringify(updatedSnippets));
  };

  return (
    <div className="code-assistant-container">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)}
        className="mb-3"
      >
        <FaArrowLeft className="me-2" /> Back
      </Button>

      <Card className="shadow-sm mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center bg-dark text-white">
          <h4 className="mb-0 d-flex align-items-center">
            <FaCode className="me-2" /> Code Assistant
          </h4>
          <Form.Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            size="sm"
            style={{ width: '150px' }}
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </Form.Select>
        </Card.Header>
        
        <div className="position-relative">
          <SyntaxHighlighter
            language={language}
            style={vs}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              background: '#f8f9fa',
              fontSize: '14px',
              height: '300px',
              overflow: 'auto'
            }}
            showLineNumbers
          >
            {code || `// Enter your ${language} code here\n`}
          </SyntaxHighlighter>
          <textarea
            ref={codeEditorRef}
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          />
        </div>

        <Card.Footer className="d-flex justify-content-between bg-light">
          <div className="d-flex gap-2">
            <Button
              variant="primary"
              onClick={handleExecute}
              disabled={isLoading || !code.trim()}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Executing...
                </>
              ) : (
                <>
                  <FaPlay className="me-2" /> Run Code
                </>
              )}
            </Button>
            <Button variant="outline-secondary" onClick={handleFormat}>
              Format Code
            </Button>
            <Button variant="outline-secondary" onClick={handleCopy}>
              <FaCopy className="me-2" /> Copy
            </Button>
          </div>
          <Button 
            variant="outline-primary" 
            onClick={() => setShowSaveModal(true)}
            disabled={!code.trim()}
          >
            <FaSave className="me-2" /> Save
          </Button>
        </Card.Footer>
      </Card>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Tabs defaultActiveKey="output" className="mb-4">
        <Tab eventKey="output" title="Output">
          <Card className="shadow-sm">
            <Card.Body style={{ minHeight: '150px' }}>
              {output ? (
                <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{output}</pre>
              ) : (
                <p className="text-muted">Execution output will appear here</p>
              )}
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="snippets" title="Saved Snippets">
          <Card className="shadow-sm">
            <Card.Body>
              {savedSnippets.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                  {savedSnippets.map((snippet) => (
                    <div key={snippet.id} className="col">
                      <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{snippet.name}</strong>
                            <span className="badge bg-secondary ms-2">
                              {snippet.language}
                            </span>
                          </div>
                          <div>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => handleLoadSnippet(snippet)}
                            >
                              Load
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeleteSnippet(snippet.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card.Header>
                        <Card.Body className="p-0">
                          <SyntaxHighlighter
                            language={snippet.language}
                            style={vs}
                            customStyle={{
                              margin: 0,
                              fontSize: '12px',
                              maxHeight: '150px'
                            }}
                            showLineNumbers
                          >
                            {snippet.code.substring(0, 200) + (snippet.code.length > 200 ? '...' : '')}
                          </SyntaxHighlighter>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center py-4">No saved code snippets yet</p>
              )}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Save Snippet Modal */}
      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Save Code Snippet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Snippet Name</Form.Label>
            <Form.Control
              type="text"
              value={snippetName}
              onChange={(e) => setSnippetName(e.target.value)}
              placeholder="e.g., API Service Template"
            />
          </Form.Group>
          <div className="mb-3">
            <strong>Language:</strong> {languages.find(l => l.value === language)?.label}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveSnippet}>
            Save Snippet
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .code-assistant-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .code-editor {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 300px;
          padding: 1rem;
          border: none;
          font-family: 'Fira Code', monospace;
          font-size: 14px;
          line-height: 1.5;
          tab-size: 2;
          opacity: 0;
          z-index: 1;
          resize: none;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default CodeAssistant;