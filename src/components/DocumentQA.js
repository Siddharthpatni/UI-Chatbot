import React, { useState, useRef } from 'react';
import { Button, Card, Form, Spinner, Alert } from 'react-bootstrap';
import { FaFileUpload, FaQuestion, FaArrowLeft } from 'react-icons/fa';

const DocumentQA = () => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('question', question);

    try {
      const response = await fetch('/api/document-qa', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <Button variant="outline-secondary" onClick={() => window.history.back()} className="mb-3">
        <FaArrowLeft className="me-2" /> Back
      </Button>

      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h3><FaFileUpload className="me-2" />Document Q&A</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Upload Document</Form.Label>
              <Form.Control
                type="file"
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files[0])}
                accept=".pdf,.docx,.txt"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Question</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question about the document..."
                />
                <Button variant="primary" type="submit" disabled={!file || !question || isLoading}>
                  {isLoading ? <Spinner size="sm" /> : <FaQuestion />}
                </Button>
              </div>
            </Form.Group>

            {answer && (
              <Card className="mt-3">
                <Card.Header>Answer</Card.Header>
                <Card.Body>
                  <Card.Text>{answer}</Card.Text>
                </Card.Body>
              </Card>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DocumentQA;